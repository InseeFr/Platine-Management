import Card from "@mui/material/Card";
import { Row } from "../Row.tsx";
import { TitleWithIconAndDivider } from "../TitleWithIconAndDivider.tsx";
import { BinocularIcon } from "../Icon/BinocularIcon.tsx";
import { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { ContactSurveysTable } from "./ContactSurveysTable.tsx";
import { APISchemas } from "../../types/api.ts";
import { useFetchQuery } from "../../hooks/useFetchQuery.ts";
import { useDebouncedState } from "../../hooks/useDebouncedState.ts";
import { useToggle } from "react-use";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
};

export const ContactSurveysContent = ({ contact }: Props) => {
  const [role, setRole] = useState("tous");
  const [state, setState] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useDebouncedState("", 500);
  const [search, setSearch] = useState("");
  const [isFilteredOpened, toggle] = useToggle(false);

  const {
    data: surveys,
    refetch,
    isLoading,
  } = useFetchQuery("/api/contacts/{id}/accreditations", {
    urlParams: {
      id: contact.identifier,
    },
    query: {
      isFilteredOpened,
    },
  });

  const filteredSurveys = filterSurveys(surveys ?? [], { search: debouncedSearch, role, state });

  return (
    <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
      <TitleWithIconAndDivider
        title={"Liste des questionnaires du contact"}
        IconComponent={BinocularIcon}
      />

      <Row justifyContent={"space-between"} component={"form"}>
        <Row spacing={3} py={4}>
          <Filters
            searchValue={search}
            stateValue={state}
            onSearch={e => {
              setSearch(e.target.value);
              setDebouncedSearch(e.target.value);
            }}
            onSelect={e => setState(e.target.value)}
          />
          <Button
            variant="outlined"
            type="reset"
            onClick={() => {
              setSearch("");
              setDebouncedSearch("");
              setRole("tous");
              setState("");
            }}
          >
            Réinitialiser
          </Button>
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

      <ContactSurveysTable surveys={filteredSurveys} refetchState={refetch} isLoading={isLoading} />
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

  if (state && state !== "all") {
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

type FiltersProps = {
  searchValue: string;
  stateValue: string;
  onSelect: (e: SelectChangeEvent) => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Filters = ({ searchValue, onSearch }: FiltersProps) => {
  return (
    <Row gap={3}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        value={searchValue}
        name="name"
        id="name"
        label="Rechercher dans le tableau"
        placeholder="Saisissez votre recherche"
        variant="outlined"
        size="small"
        onChange={onSearch}
      />
    </Row>
  );
};
