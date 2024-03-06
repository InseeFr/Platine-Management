import Card from "@mui/material/Card";
import { Row } from "../Row";
import { TitleWithIconAndDivider } from "../TitleWithIconAndDivider";
import { BinocularIcon } from "../Icon/BinocularIcon";
import { ContactSurveysFilterSelect } from "./ContactSurveysFilterSelect";
import { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { ContactSurveysTable } from "./ContactSurveysTable";
import { APISchemas } from "../../types/api";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { useDebouncedState } from "../../hooks/useDebouncedState.ts";
import { collectStates } from "./CollectStateSelect.tsx";
import { useToggle } from "react-use";

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
};

export const ContactSurveysContent = ({ contact }: Props) => {
  const [role, setRole] = useState("tous");
  const [state, setState] = useState("");
  const [search, setSearch] = useDebouncedState("", 500);
  const [isFilteredOpened, toggle] = useToggle(false);

  const { data: surveys, refetch } = useFetchQuery("/api/contacts/{id}/accreditations", {
    urlParams: {
      id: contact.identifier,
    },
    query: {
      isFilteredOpened,
    },
  });

  const filteredSurveys = filterSurveys(surveys ?? [], { search, role, state });

  return (
    <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
      <TitleWithIconAndDivider title={"Liste des enquêtes du contact"} IconComponent={BinocularIcon} />

      <Row justifyContent={"space-between"}>
        <Row spacing={3} py={4}>
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

          <ContactSurveysFilterSelect
            options={collectStates}
            placeholderLabel="Sélectionnez un état"
            label={"Etat de la collecte"}
            name={"state"}
            onFilterChange={e => setState(e.target.value)}
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
            En cours
          </ToggleButton>
          <ToggleButton value={true} aria-label="left aligned">
            Tout
          </ToggleButton>
        </ToggleButtonGroup>
      </Row>

      <ContactSurveysTable surveys={filteredSurveys} onSelectState={refetch} />
    </Card>
  );
};

function filterSurveys(
  surveys: Array<APISchemas["AccreditationDetailDto"]>,
  { search, role, state }: { search?: string; role?: string; state?: string },
) {
  if (role !== "tous") {
    surveys =
      role === "primary" ? surveys.filter(s => s.main === true) : surveys.filter(s => s.main === false);
  }

  if (state) {
    surveys = surveys.filter(s => s.lastEvent === state);
  }

  if (search) {
    surveys = surveys.filter(
      item =>
        item.year?.toString().includes(search) ||
        item.surveyUnitId?.toLocaleLowerCase().includes(search.toLowerCase()) ||
        item.sourceWording?.toLocaleLowerCase().includes(search.toLowerCase()),
    );
  }
  return surveys;
}
