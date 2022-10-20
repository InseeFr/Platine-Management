import { getOidc } from "core/configuration";
import { NONE, OIDC } from "core/constants";
import { listenActivity } from "core/events";
import { createKeycloakOidcClient } from "core/keycloak";
import React, { useEffect, useMemo, useState } from "react";
import { LoaderSimple } from "ui/shared/loader";
import { NoAuthLogin } from "./noAuth";

export const AuthContext = React.createContext();

const dummyOidcClient = {
  isUserLoggedIn: false,
};

const AuthProvider = ({ authType, children }) => {
  const [oidcClient, setOidcClient] = useState(null);

  useEffect(() => {
    const loadOidcConf = async () => {
      const oidcConf = await getOidc();

      const oidcClientKC = await createKeycloakOidcClient({
        url: oidcConf["auth-server-url"],
        realm: oidcConf["realm"],
        clientId: oidcConf["resource"],
        evtUserActivity: listenActivity,
      });
      return oidcClientKC;
    };

    const loadConf = async () => {
      if (authType === OIDC) {
        const conf = await loadOidcConf();
        setOidcClient(conf);
      } else setOidcClient(dummyOidcClient);
    };

    if (authType && oidcClient === null) loadConf();
  }, [authType]);

  const contextOidc = useMemo(() => oidcClient, [oidcClient]);

  if (oidcClient === null) return <LoaderSimple />;
  if (authType === NONE && !oidcClient?.isUserLoggedIn)
    return <NoAuthLogin setOidcClient={setOidcClient} />;
  return <AuthContext.Provider value={contextOidc}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
