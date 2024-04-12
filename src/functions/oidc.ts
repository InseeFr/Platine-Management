import { createReactOidc } from "oidc-spa/react";
import { Fragment } from "react";

type TokenInfo = {
  inseegroupedefaut: string[];
  preferred_username: string;
};

const guestUser: TokenInfo = {
  inseegroupedefaut: [import.meta.env.VITE_ADMIN_LDAP_ROLE],
  preferred_username: "Guest",
};

const dummyOidc = {
  isUserLoggedIn: true,
  logout: () => (window.location.href = "/"),
  oidcTokens: {
    decodedIdToken: guestUser,
    accessToken: "accessToken",
    idToken: null,
    refreshToken: null,
    refreshTokenExpirationTime: null,
    // accessTokenExpirationTime: Date.now() + 60 * 60 * 1000,
    accessTokenExpirationTime: 60 * 1000,
  },
  login: () => window.location.reload(),
  getTokens: () => ({
    accessToken: "accessToken",
    idToken: null,
    refreshToken: null,
    refreshTokenExpirationTime: null,
    accessTokenExpirationTime: Date.now() + 60 * 60 * 1000,
  }),
};

const isOidc = import.meta.env.VITE_AUTH_TYPE === "oidc";

export const createAppOidc = () => {
  if (isOidc) {
    return createReactOidc<TokenInfo>({
      issuerUri: import.meta.env.VITE_OIDC_ISSUER,
      clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
      publicUrl: "/",
      extraQueryParams: { kc_idp_hint: import.meta.env.VITE_IDENTITY_PROVIDER },
    });
  }

  return {
    OidcProvider: Fragment,
    useOidc: () => dummyOidc,
    prOidc: Promise.resolve(dummyOidc),
  };
};
