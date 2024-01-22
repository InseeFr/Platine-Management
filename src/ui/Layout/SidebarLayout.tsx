import Grid from "@mui/material/Grid";
import { PropsWithChildren } from "react";

/**
 * Global layout for the app with 2 sections (sidebar and main content)
 */
export function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <Grid
      gap={4}
      px={4}
      sx={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        alignItems: "stretch",
        height: "calc(100vh - 90px)",
      }}
      bgcolor="surfacePrimary.main"
    >
      {children}
    </Grid>
  );
}
