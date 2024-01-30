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
        gridTemplateColumns: "330px 1fr",
        alignItems: "stretch",
        height: "calc(100vh - 150px)",
      }}
    >
      {children}
    </Grid>
  );
}
