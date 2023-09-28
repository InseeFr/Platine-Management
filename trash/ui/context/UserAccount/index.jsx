import { createContext, useContext, useEffect, useState } from "react";
import { useAPI, useConstCallback } from "core/hooks";
import { AppContext } from "App";
import { AuthContext } from "../auth/provider";
import { ERROR_SEVERITY, INFO_SEVERITY } from "core/constants";
import { notifDictionary } from "i18n";
import { canAccessToApp } from "core/role";
import { Box, Typography } from "@mui/material";
import { errorDictionary } from "i18n";

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
        name: `${oidcUser?.preferred_username}`,
        sourceAccreditations: dataSourceAcc?.content,
        roles: [...(oidcUser["inseegroupedefaut"] || []), dataRole?.role],
        canAccess: canAccessToApp(oidcUser["inseegroupedefaut"] || []),
      };
      setUser(userLoaded);
      if (userLoaded.canAccess)
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
      {user && user.canAccess && (
        <UserAccountContext.Provider value={{ user, setUser }}>{children}</UserAccountContext.Provider>
      )}
      {user && !user.canAccess && (
        <Box sx={{ textAlign: "center" }} marginY={30}>
          <Typography
            variant="h3"
            color="error"
          >{`${notifDictionary.helloUser} ${user.name}`}</Typography>
          <br />
          <Typography variant="h5" color="error">
            {errorDictionary.noAccessToApp}
          </Typography>
          <br />
          <Typography color="error">{errorDictionary.contactAdmin}</Typography>
        </Box>
      )}
    </>
  );
};
