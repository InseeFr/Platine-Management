import { useContext } from "react";
import { AppContext } from "App";
import { AuthContext } from "ui/context/auth/provider";
import { API } from "core/api";
import { useConstCallback } from "./useConstCallback";

export const useAPI = () => {
  const oidcClient = useContext(AuthContext);
  const { apiUrl } = useContext(AppContext);

  const getContactById = useConstCallback(id => API.getContactById(apiUrl)(id)(oidcClient.accessToken));

  const getContactAccreditations = useConstCallback(id =>
    API.getContactAccreditations(apiUrl)(id)(oidcClient.accessToken),
  );

  const getContacts = useConstCallback(searchParams =>
    API.getContacts(apiUrl)(searchParams)(oidcClient.accessToken),
  );

  const getSources = useConstCallback(() => API.getSources(apiUrl)(oidcClient.accessToken));

  const updateContact = useConstCallback((id, contactInfos) =>
    API.updateContact(apiUrl)(id, contactInfos)(oidcClient.accessToken),
  );

  const getSourceAccreditations = useConstCallback(() =>
    API.getSourceAccreditations(apiUrl)(oidcClient.accessToken),
  );

  const getUserRole = useConstCallback(() => API.getUserRole(apiUrl)(oidcClient.accessToken));

  return {
    getContactById,
    getContacts,
    updateContact,
    getSourceAccreditations,
    getUserRole,
    getSources,
    getContactAccreditations,
  };
};
