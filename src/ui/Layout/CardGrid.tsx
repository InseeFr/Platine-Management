import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";

export function CardGrid({ children }: PropsWithChildren) {
  return (
    <Grid
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        paddingBottom: 2,
        // Make the element scrollable
        minHeight: 0,
        overflow: "auto",
        // Offset the scrollbar out of the container
        width: "calc(100% + .5rem)",
        paddingRight: ".5rem",
      }}
      gap={3}
    >
      {children}
    </Grid>
  );
}
