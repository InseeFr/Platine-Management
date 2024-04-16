import { useEffect } from "react";
import { createAppOidc } from "../functions/oidc.ts";
import { listenActivity } from "../functions/listenActivity.ts";

const { OidcProvider, prOidc, useOidc } = createAppOidc();

prOidc.then(oidc => {
  if (!oidc.isUserLoggedIn) {
    return;
  }
  let timer: ReturnType<typeof setTimeout> | undefined;

  console.log(oidc.getTokens().accessTokenExpirationTime);

  const getDelayExpriationinMs = () => {
    const expirationTime = oidc.getTokens().accessTokenExpirationTime;
    console.log(expirationTime);
    return expirationTime - Date.now();
  };

  const logoutIfIdle = async () => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      await oidc.logout({ redirectTo: "specific url", url: `${import.meta.env.VITE_APP_URL}/logout` });
    }, getDelayExpriationinMs());
  };

  // Initial call to set the logout timer
  logoutIfIdle();

  // Event listeners to reset timer on user activity
  listenActivity(logoutIfIdle);
});

export const useHasRole = (role: string): boolean => {
  const { oidcTokens } = useOidc({ assertUserLoggedIn: true });
  return oidcTokens.decodedIdToken.inseegroupedefaut.includes(role);
};

export const useAccessToken = (): string => {
  return useOidc({ assertUserLoggedIn: true }).oidcTokens.accessToken;
};

export const useUser = () => {
  return useOidc({ assertUserLoggedIn: true }).oidcTokens.decodedIdToken;
};

export const useMaybeUser = () => {
  return useOidc({ assertUserLoggedIn: false })?.oidcTokens?.decodedIdToken;
};

export const useLogout = () => {
  return useOidc({ assertUserLoggedIn: false }).logout;
};

export function useIsAuthenticated() {
  const { login, isUserLoggedIn, oidcTokens } = useOidc({ assertUserLoggedIn: false });

  useEffect(() => {
    if (!login) {
      return;
    }
    login({
      doesCurrentHrefRequiresAuth: false,
    });
  }, [login]);

  return { isAuthenticated: isUserLoggedIn, tokens: oidcTokens };
}

export const AuthProvider = OidcProvider;
