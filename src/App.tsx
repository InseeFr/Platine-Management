import { CircularProgress } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { useIsAuthenticated } from "./hooks/useAuth";
import "./App.css";
import { Row } from "./ui/Row";

const router = createBrowserRouter(routes);

export function App() {
  const isAuthenticated = useIsAuthenticated();
  if (!isAuthenticated) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }
  return <RouterProvider router={router} />;
}
