import { fetcher } from "./fetcher";

const putRequest = url => body => token => fetcher(url, token, "PUT", null, body);
/*
  const postRequest = (url) => (token) => (body) =>
	fetcher(url, token, "POST", body);
const deleteRequest = (url) => (token) => (body) =>
	fetcher(url, token, "DELETE", body);
*/
const getRequest = url => params => token => fetcher(url, token, "GET", params, null);
const getAllContacts = apiUrl => token => getRequest(`${apiUrl}/api/contacts`)(null)(token);
const getAllCampaigns = apiUrl => token => getRequest(`${apiUrl}/api/campaigns`)(null)(token);
const getAllSurveyUnits = apiUrl => token => getRequest(`${apiUrl}/api/survey-units`)(null)(token);

const getContacts = apiUrl => searchParams => token =>
  getRequest(`${apiUrl}/api/contacts/search`)(searchParams)(token);
const getContactById = apiUrl => id => token => getRequest(`${apiUrl}/api/contacts/${id}`)(null)(token);
const getContactAccreditations = apiUrl => id => token =>
  getRequest(`${apiUrl}/api/contacts/${id}/accreditations`)(null)(token);
const updateContact = apiUrl => (id, contactInfos) => token =>
  putRequest(`${apiUrl}/api/contacts/${id}`)(contactInfos)(token);
const getSources = apiUrl => token => getRequest(`${apiUrl}/api/sources`)(null)(token);

// eslint-disable-next-line no-unused-vars
const getUsers = apiUrl => token => ({
  data: {
    content: [
      { identifier: "1234", role: "admin" },
      { identifier: "5678", role: "gestionnaire" },
    ],
  },
  //getRequest(`${apiUrl}/api/users`)(null)(token)
});

// eslint-disable-next-line no-unused-vars
const getSourceAccreditations = apiUrl => token => ({
  data: { content: [{ source: "Survey A" }, { source: "Survey B" }] },
  //getRequest(`${apiUrl}/api/user/source-accreditations`)(null)(token);
});

// eslint-disable-next-line no-unused-vars
const getUserRole = apiUrl => token => ({
  data: { role: "admin" },
  //getRequest(`${apiUrl}/api/user/role`)(null)(token);
});

export const API = {
  getContactById,
  getContactAccreditations,
  getAllContacts,
  getAllCampaigns,
  getAllSurveyUnits,
  getContacts,
  updateContact,
  getSourceAccreditations,
  getUsers,
  getUserRole,
  getSources,
};
