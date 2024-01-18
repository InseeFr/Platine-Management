import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { PlatineTheme } from "./theme.tsx";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider authTypeb="oidc">
    <React.StrictMode>
      <PlatineTheme>
        <App />
      </PlatineTheme>
    </React.StrictMode>
  </AuthProvider>,
);
