import { SearchPage } from "./pages/SearchPage";
import { Home } from "./pages/home/Home";
import { Outlet } from "react-router-dom";
import { Layout } from "./ui/Layout";
import { PageError } from "./ui/PageError";
import { SurveyPage } from "./pages/SurveyPage";
import { ContactPage } from "./pages/ContactPage";
import { Settings } from "./pages/Settings";

export const routes = [
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <PageError />,
    children: [
      { path: "recherche", element: <SearchPage tab={0} /> },
      { path: "enquete/:idSurvey", element: <SurveyPage /> },
      { path: "contact/:idContact", element: <ContactPage /> },
      { path: "reglages", element: <Settings /> },
      { path: "", element: <Home /> },
    ],
  },
];
