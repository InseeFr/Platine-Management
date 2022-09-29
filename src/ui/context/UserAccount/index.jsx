import { createContext, useContext, useEffect, useState } from "react";
import { useAPI, useConstCallback } from "core/hooks";
import { AppContext } from "App";
import { AuthContext } from "../auth/provider";
import { ERROR_SEVERITY, INFO_SEVERITY } from "core/constants";
import { notifDictionary } from "i18n";

export const UserAccountContext = createContext();

export const UserAccountProvider = ({ children }) => {
  const { setLoading, openNotif } = useContext(AppContext);
  const { oidcUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const { getSourceAccreditations, getUserRole } = useAPI();

  const loadUserData = useConstCallback(async id => {
    setLoading(true);
    const { data: dataSourceAcc, error: errorSourceAcc } = await getSourceAccreditations();
    const { data: dataRole, error: errorRole } = await getUserRole();
    if (errorSourceAcc || errorRole) {
      openNotif({
        severity: ERROR_SEVERITY,
        message: notifDictionary.userLoadingError,
      });
    } else {
      const userLoaded = {
        id: id,
        name: `${oidcUser?.given_name} ${oidcUser?.family_name}`,
        sourceAccreditations: dataSourceAcc?.content,
        roles: [...(oidcUser?.realm_access?.roles || []), dataRole?.role],
      };
      setUser(userLoaded);
      openNotif({
        severity: INFO_SEVERITY,
        message: `${notifDictionary.helloUser} ${userLoaded.name}`,
      });
    }

    setLoading(false);
  });

  useEffect(() => {
    // For Keyloack : check if the id is "id" or something like : "preferred_username"
    if (oidcUser?.id) loadUserData(oidcUser?.id);
  }, [oidcUser?.id, loadUserData]);

  return (
    <>
      {user && (
        <UserAccountContext.Provider value={{ user, setUser }}>{children}</UserAccountContext.Provider>
      )}
    </>
  );
};
