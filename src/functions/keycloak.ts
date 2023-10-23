import Keycloak from "keycloak-js";

type OidcClientType =
  | {
      isUserLoggedIn: false;
      login: () => Promise<void>;
    }
  | {
      isUserLoggedIn: true;
      accessToken: string;
      oidcUser: {
        preferred_username: string;
        inseegroupedefaut: string[];
      };
      logout: (params: { redirectTo: string }) => Promise<void>;
    };

export const createKeycloakOidcClient = async ({
  url,
  realm,
  clientId,
}: {
  url: string;
  realm: string;
  clientId: string;
}): Promise<OidcClientType> => {
  const keycloakInstance = new Keycloak({ url, realm, clientId });

  const isAuthenticated = await keycloakInstance
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-sso.html`,
      checkLoginIframe: false,
    })
    .catch(error => error);

  const login = async () => {
    await keycloakInstance.login({ redirectUri: window.location.href, idpHint: "insee-ssp" });
  };

  const loadUserInfo = async () => {
    const userInfo = (await keycloakInstance.loadUserInfo()) as {
      preferred_username: string;
      inseegroupedefaut: string[];
    };
    return { ...userInfo, id: userInfo?.preferred_username?.toUpperCase() };
  };
  if (!isAuthenticated) {
    return {
      isUserLoggedIn: false,
      login,
    };
  }

  const oidcClient: OidcClientType = {
    isUserLoggedIn: true,
    accessToken: keycloakInstance.token ?? "",
    oidcUser: await loadUserInfo(),
    logout: async ({ redirectTo }: { redirectTo: string }) => {
      await keycloakInstance.logout({
        redirectUri: redirectTo || window.location.origin,
      });
    },
  };

  (function callee() {
    const msBeforeExpiration = (keycloakInstance.tokenParsed?.exp ?? 0) * 1000 - Date.now();

    setTimeout(
      async () => {
        console.log(
          `OIDC access token will expire in ${minValiditySecond} seconds, waiting for user activity before renewing`,
        );

        console.log("User activity detected. Refreshing access token now");

        const error = await keycloakInstance.updateToken(-1).then(
          () => undefined,
          error => error,
        );

        if (error) {
          console.log("Can't refresh OIDC access token, getting a new one");
          //NOTE: Never resolves
          await login();
        }

        oidcClient.accessToken = keycloakInstance.token ?? "";

        callee();
      },
      msBeforeExpiration - minValiditySecond * 1000,
    );
  })();

  return oidcClient;
};

export const getKeycloakConfiguration = async () => {
  return fetch("/keycloak.json").then(r => r.json()) as Promise<{
    realm: string;
    "auth-server-url": string;
    "ssl-required": string;
    resource: string;
    "public-client": boolean;
    "confidential-port": number;
  }>;
};

export const getAppConfiguration = async () => {
  return fetch("/configuration.json").then(r => r.json()) as Promise<{
    authType: string;
    "apiUrl": string;
    "moogUrl": string;
    identityProvider: string;
  }>;
};

const minValiditySecond = 25;
