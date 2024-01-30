import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { PlatineTheme } from "./theme.tsx";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./hooks/useAuth.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <PlatineTheme>
          <App />
        </PlatineTheme>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
