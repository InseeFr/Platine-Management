import { SearchPage } from "./pages/SearchPage";
import { Home } from "./pages/Home.tsx";
import { Outlet, redirect, RouteObject } from "react-router-dom";
import { Layout } from "./ui/Layout";
import { PageError } from "./ui/PageError";
import { SurveyPage } from "./pages/SurveyPage";
import { ContactPage } from "./pages/ContactPage";
import { Settings } from "./pages/Settings";
import { SearchContacts } from "./pages/Search/SearchContacts.tsx";
import { SearchSurveys } from "./pages/Search/SearchSurveys.tsx";
import { SearchSurveyUnits } from "./pages/Search/SearchSurveyUnits.tsx";
import { SurveyUnitPage } from "./pages/SurveyUnitPage.tsx";
import { CreateContactPage } from "./pages/CreateContactPage.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <PageError />,
    children: [
      {
        path: "search",
        element: <SearchPage />,
        children: [
          { path: "", element: <SearchContacts />, loader: () => redirect("/search/contacts") },
          { path: "contacts", element: <SearchContacts /> },
          { path: "survey-units", element: <SearchSurveyUnits /> },
          { path: "surveys", element: <SearchSurveys /> },
        ],
      },
      { path: "surveys/:id", element: <SurveyPage /> },
      { path: "contacts/:id", element: <ContactPage /> },
      { path: "survey-units/:id", element: <SurveyUnitPage /> },
      { path: "reglages", element: <Settings /> },
      { path: "contacts/createContact", element: <CreateContactPage /> },
      { path: "", element: <Home /> },
    ],
  },
];
