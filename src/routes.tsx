import { SearchPage } from "./pages/SearchPage.tsx";
import { Home } from "./pages/Home.tsx";
import { Outlet, redirect, RouteObject } from "react-router-dom";
import { Layout, LayoutWithAuth } from "./ui/Layout.tsx";
import { PageError } from "./ui/PageError.tsx";
import { SurveyPage } from "./pages/SurveyPage.tsx";
import { ContactPage } from "./pages/ContactPage.tsx";
import { Settings } from "./pages/Settings.tsx";
import { SearchContacts } from "./pages/Search/SearchContact.tsx";
import { SearchSurveys } from "./pages/Search/SearchSurveys.tsx";
import { SearchSurveyUnits } from "./pages/Search/SearchSurveyUnits.tsx";
import { SurveyUnitPage } from "./pages/SurveyUnitPage.tsx";
import { CreateContactPage } from "./pages/CreateContactPage.tsx";
import { UnauthorizedPage } from "./pages/UnauthorizedPage.tsx";
import { LogoutPage } from "./pages/Logout.tsx";

export const routes: RouteObject[] = [
  {
    path: "logout",
    element: (
      <Layout>
        <LogoutPage />
      </Layout>
    ),
  },
  {
    path: "/",
    element: (
      <LayoutWithAuth>
        <Outlet />
      </LayoutWithAuth>
    ),
    errorElement: <PageError />,
    children: [
      {
        path: "contacts",
        element: <SearchContacts />,
      },
      {
        path: "survey-units",
        element: <SearchSurveyUnits />,
      },
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

export const unauthorizedRoutes: RouteObject[] = [
  {
    path: "/logout",
    element: (
      <Layout>
        <LogoutPage />
      </Layout>
    ),
  },
  {
    path: "/*",
    element: (
      <LayoutWithAuth>
        <UnauthorizedPage />
      </LayoutWithAuth>
    ),
    errorElement: <PageError />,
  },
];

/* export const unauthenticatedRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <PageError />,
    children: [
      { path: "logout", element: <LogoutPage /> },
      { path: "", element: <Home /> },
    ],
  },
]; */
