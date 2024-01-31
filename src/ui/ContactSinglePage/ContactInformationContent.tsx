import Grid from "@mui/material/Grid";
import { ContactDetailsCard } from "./ContactDetailsCard/ContactDetailsCard";
import { PasswordCard } from "./PasswordCard";
import { HistoryActionsCard } from "./HistoryActionsCard";
import { CommentsCard } from "./CommentsCard";
import { APISchemas } from "../../types/api.ts";
import { Breadcrumbs, Item } from "../Breadcrumbs.tsx";
import Stack from "@mui/material/Stack";

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
  breadcrumbs: Item[];
};

export const ContactInformationContent = ({ contact, breadcrumbs }: Props) => {
  return (
    <Stack px={3} py={3}>
      <Breadcrumbs items={breadcrumbs} />
      <Grid
        px={3}
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
    </Stack>
  );
};
