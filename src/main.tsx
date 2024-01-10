import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { theme } from "./theme.ts";
import { ThemeProvider } from "@mui/material";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider authTypeb="oidc">
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </AuthProvider>,
);
