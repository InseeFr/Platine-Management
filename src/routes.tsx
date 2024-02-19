import { SearchPage } from "./pages/SearchPage";
import { Home } from "./pages/Home.tsx";
import { Outlet, redirect, RouteObject } from "react-router-dom";
import { Layout } from "./ui/Layout";
import { PageError } from "./ui/PageError";
import { SurveyPage } from "./pages/SurveyPage";
import { ContactPage } from "./pages/ContactPage";
import { SettingsPage } from "./pages/SettingsPage.tsx";
import { SearchContacts } from "./pages/Search/SearchContacts.tsx";
import { SearchSurveys } from "./pages/Search/SearchSurveys.tsx";
import { SearchSurveyUnits } from "./pages/Search/SearchSurveyUnits.tsx";

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
      { path: "settings", element: <SettingsPage /> },
      { path: "", element: <Home /> },
    ],
  },
];
