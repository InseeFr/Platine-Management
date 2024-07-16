import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes, unauthorizedRoutes } from "./routes.tsx";
import { useHasPermission } from "./hooks/usePermissions.ts";
import "./App.css";

const router = createBrowserRouter(routes);
const unauthorizedRouter = createBrowserRouter(unauthorizedRoutes);

export function App() {
  const canAccessSite = useHasPermission("ACCESS_APP");

  if (!canAccessSite) {
    return <RouterProvider router={unauthorizedRouter} />;
  }

  return <RouterProvider router={router} />;
}
