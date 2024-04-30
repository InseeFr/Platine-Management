import { createMockReactOidc } from "oidc-spa/mock/react";
import { createReactOidc } from "oidc-spa/react";

type TokenInfo = {
  inseegroupedefaut: string[];
  preferred_username: string;
};

const guestUser: TokenInfo = {
  inseegroupedefaut: [import.meta.env.VITE_USER_LDAP_ROLE],
  preferred_username: "Guest",
};

const isOidc = import.meta.env.VITE_AUTH_TYPE === "oidc";

export const createAppOidc = () => {
  if (isOidc) {
    return createReactOidc<TokenInfo>({
      issuerUri: import.meta.env.VITE_OIDC_ISSUER,
      clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
      publicUrl: "/",
      autoLogoutParams: { redirectTo: "specific url", url: `${import.meta.env.VITE_APP_URL}/logout` },
      extraQueryParams: { kc_idp_hint: import.meta.env.VITE_IDENTITY_PROVIDER },
    });
  }

  return createMockReactOidc<TokenInfo>({
    isUserInitiallyLoggedIn: true,
    mockedTokens: {
      decodedIdToken: guestUser,
      accessToken: "accessToken",
    },
  });
};
