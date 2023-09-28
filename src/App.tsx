import { Home } from "./pages/home/Home";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}
