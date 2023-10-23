import { CircularProgress } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { useIsAuthenticated } from "./hooks/useAuth";
import "./App.css";

const router = createBrowserRouter(routes);

export function App() {
  const isAuthenticated = useIsAuthenticated();
  if (!isAuthenticated) return <CircularProgress />;
  return <RouterProvider router={router} />;
}
