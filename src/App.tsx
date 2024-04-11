import { CircularProgress } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { useIsAuthenticated } from "./hooks/useAuth";
import { useHasPermission } from "./hooks/usePermissions";
import "./App.css";
import { Row } from "./ui/Row";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";

const router = createBrowserRouter(routes);

export function App() {
  const { isAuthenticated } = useIsAuthenticated();

  if (!isAuthenticated) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  return <AuthenticatedApp />;
}

function AuthenticatedApp() {
  const canAccessSite = useHasPermission("ACCESS_SITE");

  if (!canAccessSite) {
    // TODO : Mettre un composant Unauthorized
    return <UnauthorizedPage />;
  }

  return <RouterProvider router={router} />;
}
