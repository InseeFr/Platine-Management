export const routes = moogUrl => [
  {
    id: "surveys",
    fullPath: "/pilotage/enquetes",
    path: "enquetes",
    label: "Enquêtes",
  },
  {
    id: "users",
    fullPath: "/pilotage/utilisateurs",
    path: "utilisateurs",
    label: "Utilisateurs",
  },
  {
    id: "contacts",
    fullPath: "/pilotage/contacts",
    path: "contacts",
    label: "Contacts",
  },
  {
    id: "suivi",
    fullPath: moogUrl,
    path: "suivi",
    label: "Suivi",
    external: true,
  },
];
