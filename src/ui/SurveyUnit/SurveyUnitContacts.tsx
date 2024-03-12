import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Row } from "../Row";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { Box, Button, Card, CardActionArea, CircularProgress, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { TextWithLeftIcon } from "../TextWithLeftIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailIcon from "@mui/icons-material/Email";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { APISchemas } from "../../types/api";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
};

export const SurveyUnitContacts = ({ surveyUnit }: Props) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("me");

  const { data: contacts } = useFetchQuery("/api/survey-units/{id}/contacts", {
    urlParams: {
      id: surveyUnit.idSu,
    },
  });

  if (!contacts) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  return (
    <Box>
      <Stack spacing={4} sx={{ minHeight: 0, px: 3, py: 1 }}>
        <Row justifyContent={"space-between"}>
          <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => setTab(v)}>
            <ToggleButton value="me" aria-label="left aligned">
              Mes contacts
            </ToggleButton>
            <ToggleButton value="all" aria-label="left aligned">
              Tout
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>
        <Grid
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            paddingRight: ".5rem",
          }}
          columnGap={5}
          rowGap={6}
        >
          {contacts.map(c => (
            <div key={c.identifier}>
              <SurveyUnitContactCard contact={c} />
            </div>
          ))}
        </Grid>
      </Stack>
      <Button
        sx={{
          position: "fixed",
          bottom: "48px",
          right: "32px",
          borderRadius: 24,
          typography: "titleSmall",
          fontWeight: "500",
        }}
        size="large"
        fullWidth={false}
        variant="contained"
        endIcon={<EditIcon />}
        onClick={() => navigate("/contacts/createContact")}
      >
        Créer un nouveau contact
      </Button>
    </Box>
  );
};

const SurveyUnitContactCard = ({ contact }: any) => {
  return (
    <Card elevation={2}>
      <CardActionArea component={Link} to={`/contacts/${contact.identifier}`}>
        <Box px={3} py={2}>
          <Typography align="right" variant="titleMedium" color="text.tertiary" gutterBottom>
            #{contact.identifier}
          </Typography>

          <Stack gap={2.5}>
            <ContactCardTitle firstName={contact.firstName} lastName={contact.lastName} />

            <Stack spacing={0.5} color="text.secondary">
              <TextWithLeftIcon IconComponent={LocationOnIcon} text={contact.city} />
              <TextWithLeftIcon IconComponent={LocalPhoneOutlinedIcon} text={contact.phoneNumber} />
              <TextWithLeftIcon IconComponent={EmailIcon} text={contact.email} />
            </Stack>
            <Typography color={"text.tertiary"} variant="titleSmall">
              {contact.listSourcesId?.join(", ")}
            </Typography>
            <Row gap={1}>
              <ContactPageOutlinedIcon />
              <Typography variant="titleSmall" fontWeight={700} color="black">
                Contact {contact.role === "primary" ? "principal" : "secondaire"} TODO
              </Typography>
            </Row>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export const ContactCardTitle = ({ firstName, lastName }: { firstName?: string; lastName?: string }) => {
  return (
    <Row gap={1}>
      <PersonOutlineOutlinedIcon />
      <Typography variant="titleLarge" fontWeight={600} color="text.primary">
        {`${firstName ?? ""} ${lastName ?? ""}`}
      </Typography>
    </Row>
  );
};
