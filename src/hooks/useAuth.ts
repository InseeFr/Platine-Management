import { useEffect } from "react";
import { createAppOidc } from "../functions/oidc.ts";

const { OidcProvider, useOidc } = await createAppOidc();

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
  const { logout } = useOidc({ assertUserLoggedIn: true });
  return logout;
};

export function useIsAuthenticated(): boolean {
  const { login, isUserLoggedIn } = useOidc({ assertUserLoggedIn: false });

  useEffect(() => {
    if (!login) {
      return;
    }
    login({
      doesCurrentHrefRequiresAuth: false,
      extraQueryParams: { kc_idp_hint: import.meta.env.VITE_IDENTITY_PROVIDER },
    });
  }, [login]);

  return isUserLoggedIn;
}

export const AuthProvider = OidcProvider;
