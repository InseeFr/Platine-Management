import Grid from "@mui/material/Grid";
import { ContactDetailsCard } from "./ContactDetailsCard/ContactDetailsCard";
import { PasswordCard } from "./PasswordCard";
import { HistoryActions } from "./HistoryActions";

export const ContactInformationContent = () => {
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
      <ContactDetailsCard />
      <PasswordCard />
      <HistoryActions />
    </Grid>
  );
};
