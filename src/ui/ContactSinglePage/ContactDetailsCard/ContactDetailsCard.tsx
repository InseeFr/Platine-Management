import { Box, Card, Divider, IconButton, Stack, Typography } from "@mui/material";
import { ContactDetailsCardTitle } from "../TitleWithIcon";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import { Row } from "../../Row";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { ContactDetailsDialog } from "./ContactDetailsDialog";

type Props = {};

// add second phone number, special mention and "Barilla ?" in api
const contact = {
  firstname: "Marie",
  lastname: "Laurent",
  identifier: "MAIV001",
  civility: "Female",
  function: "comptable",
  email: "m.laurent@mail.fr",
  phone: "04 42 12 34 56",
  address: {
    streetNumber: "23",
    repetitionIndex: "bis",
    streetType: "rue",
    streetName: "Caulaincourt",
    zipCode: "75018",
    cityName: "Paris",
    specialDistribution: "Bureau dstributeur",
    cedexCode: "56000",
    countryName: "France",
  },
};
export const ContactDetailsCard = ({}: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const civility = contact.civility ? (contact.civility === "Female" ? "Madame" : "Monsieur") : "";
  return (
    <Card sx={{ px: 6, py: 3 }} elevation={2}>
      <Stack spacing={4}>
        <Row justifyContent={"space-between"}>
          <ContactDetailsCardTitle IconComponent={AssignmentIndOutlinedIcon} title={"Coordonnées"} />
          <IconButton onClick={handleClickOpen} color="inherit">
            <BorderColorOutlinedIcon fontSize="small" />
          </IconButton>
        </Row>
        <Row spacing={8}>
          <Stack spacing={1} typography={"bodyMedium"}>
            <Typography variant="titleSmall">
              {civility} {contact.firstname} {contact.lastname.toUpperCase()}
            </Typography>
            <Box component={"span"}>{contact.function}</Box>
            <Box component={"span"}>{contact.email}</Box>
            <Row spacing={2}>
              <Box component={"span"}>{contact.phone}</Box>
              <StarIcon fontSize="small" color="yellow" />
            </Row>
            <Box component={"span"}>{contact.phone}</Box>
          </Stack>
          <Divider orientation="vertical" variant="middle" sx={{ height: "130px" }} />
          <Stack spacing={1} typography={"bodyMedium"}>
            <Typography variant="titleSmall">BARILLA</Typography>
            <Box component={"span"}>
              {`${contact.address.streetNumber} ${contact.address.streetType} ${contact.address.streetName},
              ${contact.address.zipCode}, ${contact.address.cityName}`}
            </Box>
            <Box component={"span"}>
              {contact.address.specialDistribution}, {contact.address.cedexCode},{" "}
              {contact.address.countryName}
            </Box>
            <Box component={"span"}>Complément</Box>
            <Box component={"span"}>Mention Spéciale</Box>
          </Stack>
        </Row>
      </Stack>
      <ContactDetailsDialog open={open} handleClose={handleClose} />
    </Card>
  );
};
