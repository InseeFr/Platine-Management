import { SearchPage } from "./pages/SearchPage";
import { Home } from "./pages/Home.tsx";
import { Outlet, redirect, RouteObject } from "react-router-dom";
import { Layout } from "./ui/Layout";
import { PageError } from "./ui/PageError";
import { SurveyPage } from "./pages/SurveyPage";
import { ContactPage } from "./pages/ContactPage";
import { Settings } from "./pages/Settings";
import { SearchContacts } from "./pages/Search/SearchContacts.tsx";
import { SearchCampaigns } from "./pages/Search/SearchCampaigns.tsx";
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
          { path: "campaigns", element: <SearchCampaigns /> },
        ],
      },
      { path: "enquete/:id", element: <SurveyPage /> },
      { path: "contact/:id", element: <ContactPage /> },
      { path: "reglages", element: <Settings /> },
      { path: "", element: <Home /> },
    ],
  },
];
