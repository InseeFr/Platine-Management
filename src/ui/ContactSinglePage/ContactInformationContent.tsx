import Grid from "@mui/material/Grid";
import { ContactDetailsCard } from "./ContactDetailsCard/ContactDetailsCard";
import { PasswordCard } from "./PasswordCard";
import { HistoryActionsCard } from "./HistoryActionsCard";
import { CommentsCard } from "./CommentsCard";
import { APISchemas } from "../../types/api.ts";

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
};

export const ContactInformationContent = ({ contact }: Props) => {
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
      <ContactDetailsCard contact={contact} />
      <PasswordCard />
      <HistoryActionsCard />
      <CommentsCard />
    </Grid>
  );
};
