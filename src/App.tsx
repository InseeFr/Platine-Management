import { CircularProgress } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { useLogin } from "./hooks/useAuth";
import "./App.css";

const router = createBrowserRouter(routes);

export function App() {
  const isAuthenticated = useLogin();
  if (!isAuthenticated) return <CircularProgress />;
  return <RouterProvider router={router} />;
}
