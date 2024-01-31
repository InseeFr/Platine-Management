import { createReactOidc } from "oidc-spa/react";
import { Fragment } from "react";

type TokenInfo = {
  inseegroupedefaut: string[];
  preferred_username: string;
};

const guestUser: TokenInfo = {
  inseegroupedefaut: [],
  preferred_username: "Guest",
};

const isOidc = import.meta.env.VITE_AUTH_TYPE === "oidc";

export const createAppOidc = () => {
  if (isOidc) {
    return createReactOidc<TokenInfo>({
      issuerUri: import.meta.env.VITE_OIDC_ISSUER,
      clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
      publicUrl: "/",
    });
  }

  return {
    OidcProvider: Fragment,
    useOidc: () => ({
      login: () => null,
      isUserLoggedIn: true,
      oidcTokens: {
        decodedIdToken: guestUser,
        accessToken: "accessToken",
      },
      logout: () => (window.location.href = "/"),
    }),
  };
};
