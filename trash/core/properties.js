import { menuDictionary } from "i18n";

export const routes = moogUrl => [
  {
    id: "surveys",
    fullPath: "/pilotage/enquetes",
    path: "enquetes",
    label: menuDictionary.surveys,
  },
  {
    id: "users",
    fullPath: "/pilotage/utilisateurs",
    path: "utilisateurs",
    label: menuDictionary.users,
  },
  {
    id: "contacts",
    fullPath: "/pilotage/contacts",
    path: "contacts",
    label: menuDictionary.contacts,
  },
  {
    id: "suivi",
    fullPath: moogUrl,
    path: "suivi",
    label: menuDictionary.follow,
    external: true,
  },
];
