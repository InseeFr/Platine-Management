import { Box, Card, Divider, IconButton, Stack, Typography } from "@mui/material";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import { Row } from "../Row";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import StarIcon from "@mui/icons-material/Star";
import { ContactFormDialog } from "./ContactFormDialog.tsx";
import { APISchemas } from "../../types/api.ts";
import { useToggle } from "react-use";
import { AddressInformations } from "../AddressInformations.tsx";

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
  onSave: () => void;
};

export const ContactDetailsCard = ({ contact, onSave }: Props) => {
  const [hasDialog, toggleDialog] = useToggle(false);

  const handleSave = () => {
    toggleDialog();
    onSave();
  };

  const civility =
    contact.civility !== "Undefined" && contact.civility
      ? contact.civility === "Female"
        ? "Madame"
        : "Monsieur"
      : "";
  return (
    <Card sx={{ px: 6, py: 3 }} elevation={2}>
      <Stack spacing={4}>
        <Row justifyContent={"space-between"}>
          <CardtitleWithIcon IconComponent={AssignmentIndOutlinedIcon} title={"Coordonnées"} />
          <IconButton onClick={toggleDialog} color="inherit">
            <BorderColorOutlinedIcon fontSize="small" />
          </IconButton>
        </Row>
        <Row spacing={8} alignItems={"flex-start"}>
          <Stack spacing={1} typography={"bodyMedium"}>
            <Typography variant="titleSmall">
              {civility} {contact.firstName} {contact.lastName?.toUpperCase()}
            </Typography>
            {contact.function && <Box component={"span"}>{contact.function}</Box>}
            <Box component={"span"}>{contact.email}</Box>
            <Row spacing={2}>
              <Box component={"span"}>{contact.phone}</Box>
              {contact.phone && <StarIcon fontSize="small" color="yellow" />}
            </Row>
            <Box component={"span"}>{contact.phone}</Box>
          </Stack>
          <Divider orientation="vertical" variant="middle" sx={{ height: "130px" }} />
          <AddressInformations identificationName={contact.usualCompanyName} address={contact.address} />
        </Row>
      </Stack>
      <ContactFormDialog open={hasDialog} onClose={toggleDialog} onSave={handleSave} contact={contact} />
    </Card>
  );
};
