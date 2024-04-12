import { useEffect } from "react";
import { createAppOidc } from "../functions/oidc.ts";
import { listenActivity } from "../functions/listenActivity.ts";

const { OidcProvider, prOidc, useOidc } = createAppOidc();

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

export const useLogout = () => {
  return useOidc({ assertUserLoggedIn: true }).logout;
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

prOidc.then(oidc => {
  if (!oidc.isUserLoggedIn) {
    return;
  }
  let timer: number | undefined;

  console.log(oidc.getTokens().accessTokenExpirationTime);

  const getDelayExpriationinMs = () => {
    const expirationTime = oidc.getTokens().accessTokenExpirationTime;
    console.log(expirationTime);
    return expirationTime - Date.now();
  };

  const logoutIfIdle = async () => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      await oidc.logout({ redirectTo: "specific url", url: "http://localhost:5173/logout" });
    }, getDelayExpriationinMs());
  };

  // Initial call to set the logout timer
  logoutIfIdle();

  // Event listeners to reset timer on user activity
  listenActivity(logoutIfIdle);
});

export const AuthProvider = OidcProvider;
