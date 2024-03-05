import Card from "@mui/material/Card";
import { Row } from "../Row";
import { TitleWithIconAndDivider } from "../TitleWithIconAndDivider";
import { BinocularIcon } from "../Icon/BinocularIcon";
import { ContactSurveysFilterSelect } from "./ContactSurveysFilterSelect";
import { ChangeEvent, useEffect, useState } from "react";
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

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
};

export const ContactSurveysContent = ({ contact }: Props) => {
  const [role, setRole] = useState<string>("tous");
  const [state, setState] = useState<string>();
  const [search, setSearch] = useDebouncedState("", 500);
  const [isFilteredOpened, setIsFilteredOpened] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const { data: surveys } = useFetchQuery("/api/contacts/{id}/accreditations", {
    urlParams: {
      id: contact.identifier,
    },
    query: {
      isFilteredOpened,
    },
  });

  const [filteredSurveys, setFilteredSurveys] = useState(surveys ?? []);

  useEffect(() => {
    let filteredSurveysTmp: Array<APISchemas["AccreditationDetailDto"]> = surveys ?? [];

    if (role !== "tous") {
      filteredSurveysTmp =
        role === "primary"
          ? filteredSurveysTmp.filter(s => s.main === true)
          : filteredSurveysTmp.filter(s => s.main === false);
    }

    state && (filteredSurveysTmp = filteredSurveysTmp.filter(s => s.lastEvent === state));

    if (search && search !== "")
      filteredSurveysTmp = filteredSurveysTmp.filter(
        item =>
          item.year?.toString().includes(search) ||
          item.surveyUnitId?.toLocaleLowerCase().includes(search.toLowerCase()) ||
          item.sourceWording?.toLocaleLowerCase().includes(search.toLowerCase()),
      );

    setFilteredSurveys(filteredSurveysTmp);
  }, [role, state, search, surveys]);

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
            onChange={handleChange}
          />
        </Row>
        <ToggleButtonGroup
          value={isFilteredOpened}
          exclusive
          onChange={(_, v) => setIsFilteredOpened(v)}
        >
          <ToggleButton value={false} aria-label="left aligned">
            En cours
          </ToggleButton>
          <ToggleButton value={true} aria-label="left aligned">
            Tout
          </ToggleButton>
        </ToggleButtonGroup>
      </Row>

      <ContactSurveysTable surveys={filteredSurveys} />
    </Card>
  );
};
