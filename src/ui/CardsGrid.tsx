import { PropsWithChildren } from "react";
import Grid from "@mui/material/Grid";

export function CardsGrid({ children }: PropsWithChildren) {
  return (
    <Grid
      px={6}
      py={3}
      container
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(690px, 1fr))",
        columnGap: 4,
        rowGap: 3,
      }}
    >
      {children}
    </Grid>
  );
}
