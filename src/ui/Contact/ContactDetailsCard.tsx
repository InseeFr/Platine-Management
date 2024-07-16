import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";
import { Row } from "../Row.tsx";
import { ContactFormDialog } from "./ContactFormDialog.tsx";
import { APISchemas } from "../../types/api.ts";
import { useToggle } from "react-use";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

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

  const street = [
    contact.address?.streetNumber,
    contact.address?.repetitionIndex,
    contact.address?.streetType,
    contact.address?.streetName,
  ]
    .filter(element => element !== "" && element !== undefined && element !== null)
    .join(" ");

  const city = [
    contact.address?.cedexCode,
    contact.address?.cedexName,
    contact.address?.zipCode,
    contact.address?.cityName,
  ]
    .filter(element => element !== "" && element !== undefined && element !== null)
    .join(" ");

  const address = [
    contact.address?.specialDistribution,
    contact.address?.addressSupplement,
    street,
    city,
    contact.address?.countryName,
  ].filter(element => element !== "" && element !== undefined && element !== null);

  return (
    <Card sx={{ p: 3, flex: 1 }} elevation={2}>
      <Stack spacing={2}>
        <Row justifyContent={"space-between"}>
          <CardtitleWithIcon IconComponent={PersonOutlineOutlinedIcon} title={"Coordonnées"} />
          <IconButton onClick={toggleDialog} color="primary">
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
        </Row>
        <Stack spacing={1} typography={"bodyMedium"}>
          {(contact.firstName || contact.lastName || civility) && (
            <Typography variant="titleSmall">
              {civility} {contact.firstName} {contact.lastName?.toUpperCase()}
            </Typography>
          )}
          {address.length !== 0 && <Typography variant="bodyMedium">{address.join(", ")}</Typography>}
          {contact.email && <Box component={"span"}>{contact.email}</Box>}
          {contact.phone && <Box component={"span"}>{contact.phone}</Box>}
          {contact.otherPhone && <Box component={"span"}>{contact.otherPhone}</Box>}
          {contact.function && <Box component={"span"}>{contact.function}</Box>}
        </Stack>
      </Stack>
      <ContactFormDialog open={hasDialog} onClose={toggleDialog} onSave={handleSave} contact={contact} />
    </Card>
  );
};
