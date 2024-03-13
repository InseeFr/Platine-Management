import { ContactDetailsCard } from "../../ui/Contact/ContactDetailsCard";
import { PasswordCard } from "../../ui/Contact/PasswordCard";
import { HistoryActionsCard } from "../../ui/Contact/HistoryActionsCard";
import { CommentsCard } from "../../ui/Contact/CommentsCard";
import { APISchemas } from "../../types/api.ts";
import { Row } from "../../ui/Row.tsx";
import Stack from "@mui/material/Stack";

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
  onSave: () => void;
};

export const ContactInfosTab = ({ contact, onSave }: Props) => {
  return (
    <Stack gap={3}>
      <Row px={3} gap={4} alignItems={"flex-start"}>
        <ContactDetailsCard contact={contact} onSave={onSave} />
        <PasswordCard />
      </Row>
      <Row px={3} gap={4} alignItems={"flex-start"}>
        <HistoryActionsCard />
        <CommentsCard />
      </Row>
    </Stack>
  );
};
