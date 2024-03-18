import { ContactDetailsCard } from "../../ui/Contact/ContactDetailsCard";
import { PasswordCard } from "../../ui/Contact/PasswordCard";
import { HistoryActionsCard } from "../../ui/Contact/HistoryActionsCard";
import { CommentsCard } from "../../ui/Contact/CommentsCard";
import { APISchemas } from "../../types/api.ts";
import Grid from "@mui/material/Grid";

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
  onSave: () => void;
};

export const ContactInfosTab = ({ contact, onSave }: Props) => {
  return (
    <Grid
      px={3}
      container
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: 4,
        rowGap: 3,
      }}
    >
      <ContactDetailsCard contact={contact} onSave={onSave} />
      <PasswordCard />
      <HistoryActionsCard />
      <CommentsCard />
    </Grid>
  );
};
