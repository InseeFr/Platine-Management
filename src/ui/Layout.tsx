import { type PropsWithChildren } from "react";
import { Header } from "./Header";
import { useIsAuthenticated } from "../hooks/useAuth";
import { CircularProgress } from "@mui/material";
import { Row } from "../ui/Row";

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export function LayoutWithAuth({ children }: PropsWithChildren) {
  const { isAuthenticated } = useIsAuthenticated();

  if (!isAuthenticated) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
