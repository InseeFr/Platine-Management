import { type PropsWithChildren } from "react";
import { useIsAuthenticated } from "../hooks/useAuth.ts";
import { Box, CircularProgress } from "@mui/material";
import { Row } from "../ui/Row.tsx";
import { NavigationDrawer } from "./NavigationDrawer.tsx";

export function Layout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ display: "flex" }}>
      <NavigationDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
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
    <Box sx={{ display: "flex" }}>
      <NavigationDrawer />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
