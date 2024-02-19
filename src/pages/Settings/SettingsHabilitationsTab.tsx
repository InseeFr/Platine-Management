import { Grid } from "@mui/material";
import { SettingsHabilitationsCard } from "../../ui/Settings/SettingsHabilitationsCard";

export const SettingsHabilitationsTab = () => {
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
      <SettingsHabilitationsCard />
    </Grid>
  );
};
