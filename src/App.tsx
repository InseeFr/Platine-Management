import { CircularProgress } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes, unauthorizedRoutes } from "./routes";
import { useIsAuthenticated } from "./hooks/useAuth";
import { useHasPermission } from "./hooks/usePermissions";
import "./App.css";
import { Row } from "./ui/Row";

const router = createBrowserRouter(routes);
const unauthorizedRouter = createBrowserRouter(unauthorizedRoutes);

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
  const canAccessSite = useHasPermission("ACCESS_APP");

  if (!canAccessSite) {
    return <RouterProvider router={unauthorizedRouter} />;
  }

  return <RouterProvider router={router} />;
}
