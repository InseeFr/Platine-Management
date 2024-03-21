import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Row } from "../Row";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { TextWithLeftIcon } from "../TextWithLeftIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailIcon from "@mui/icons-material/Email";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { APISchemas } from "../../types/api";
import { ContactSurveysFilterSelect } from "../Contact/ContactSurveysFilterSelect";
import SearchIcon from "@mui/icons-material/Search";
import useToggle from "react-use/lib/useToggle";
import { useDebouncedState } from "../../hooks/useDebouncedState";
import { Link } from "../Link";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
};

export const SurveyUnitContacts = ({ surveyUnit }: Props) => {
  const [search, setSearch] = useDebouncedState("", 500);
  const [role, setRole] = useState("tous");
  const [isFilteredOpened, toggle] = useToggle(false);

  const { data: contacts, isLoading } = useFetchQuery("/api/survey-units/{id}/contacts", {
    urlParams: {
      id: surveyUnit.idSu,
    },
    query: {
      isFilteredOpened,
    },
  });

  if (!contacts) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  const filteredContacts = filterContacts(contacts ?? [], { search, role });

  return (
    <Box>
      <Stack spacing={4} sx={{ minHeight: 0, px: 3, py: 1 }}>
        <Row justifyContent={"space-between"}>
          <Row spacing={3} py={2}>
            <ContactSurveysFilterSelect
              options={[
                { label: "Tous", value: "tous" },
                { label: "Principal", value: "primary" },
                { label: "Secondaire", value: "secondary" },
              ]}
              defaultValue={"tous"}
              label={"Rôle du contact"}
              name={"role"}
              onFilterChange={e => setRole(e.target.value)}
            />

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              name="name"
              id="name"
              label="Rechercher dans le tableau"
              placeholder="Saisissez votre recherche"
              variant="outlined"
              size="small"
              onChange={e => setSearch(e.target.value)}
            />
          </Row>
          <ToggleButtonGroup value={isFilteredOpened} exclusive onChange={(_, v) => toggle(v)}>
            <ToggleButton value={false} aria-label="left aligned">
              Mes contacts
            </ToggleButton>
            <ToggleButton value={true} aria-label="left aligned">
              Tout
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>
        <Grid
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
          columnGap={5}
          rowGap={6}
        >
          {filteredContacts.map(c => (
            <div key={c.identifier}>
              <SurveyUnitContactCard contact={c} />
            </div>
          ))}
        </Grid>
      </Stack>

      {!isLoading && filteredContacts.length === 0 && (
        <Row justifyContent={"space-around"}>
          <Typography variant="titleMedium">Aucun résultat</Typography>
        </Row>
      )}

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
      >
        <Link to={"/contacts/createContact"} color="inherit" underline="none">
          Créer un nouveau contact
        </Link>
      </Button>
    </Box>
  );
};

const SurveyUnitContactCard = ({ contact }: { contact: APISchemas["SurveyUnitContact"] }) => {
  const listSourcesId =
    contact.listSourcesId !== undefined && contact.listSourcesId?.length > 12
      ? `${contact.listSourcesId?.slice(0, 12).join(", ")}...`
      : contact.listSourcesId?.join(", ");

  return (
    <Card elevation={2}>
      <CardActionArea component={Link} to={`/contacts/${contact.identifier}`}>
        <Box px={3} py={2}>
          <Typography align="right" variant="titleLarge" color="text.tertiary" gutterBottom>
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
              {listSourcesId ?? ""}
            </Typography>
            <Row gap={1}>
              <ContactPageOutlinedIcon />
              <Typography variant="titleSmall" fontWeight={700} color="black">
                {/* Contact {contact.role === "primary" ? "principal" : "secondaire"} TODO */}
                TODO Role
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
      <Typography variant="titleMedium" fontWeight={600} color="text.primary">
        {`${firstName ?? ""} ${lastName ?? ""}`}
      </Typography>
    </Row>
  );
};

function filterContacts(
  contacts: Array<APISchemas["SurveyUnitContact"]>,
  { search }: { search?: string; role?: string },
) {
  // TODO: wait api role data
  // if (role !== "tous") {
  //   contacts =
  //     role === "primary"
  //       ? contacts.filter(c => c.main === true)
  //       : contacts.filter(c => c.main === false);
  // }

  if (search) {
    contacts = contacts.filter(
      item =>
        item.lastName?.toString().includes(search) ||
        item.firstName?.toLocaleLowerCase().includes(search.toLowerCase()) ||
        item.identifier?.toLocaleLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLocaleLowerCase().includes(search.toLowerCase()),
    );
  }
  return contacts;
}
