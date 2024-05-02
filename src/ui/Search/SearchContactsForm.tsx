import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ExpandButton } from "../ExpandButton";
import { useState } from "react";
import { SearchSurveySelect } from "./SearchSurveySelect";
import { SelectWithOptions } from "../Form/SelectWithOptions";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { SearchPanelActions } from "./SearchPanelActions";
import { useGetSearchFilter, useSearchForm } from "../../hooks/useSearchFilter";

export const SearchContactsForm = () => {
  const [expanded, setExpanded] = useState(false);

  const { data: periodicities } = useFetchQuery("/api/periodicities");

  const sortedPeriodicities = periodicities?.sort((a, b) => (a.label > b.label ? 1 : -1)) ?? [];

  // TODO use another endpoint
  const { data } = useFetchQuery("/api/surveys", { query: { size: 50 } });

  const surveysName = data?.content?.map(s => s.sourceId) ?? [];
  // filter undefined value before sorting (use Set to remove duplicate value)
  const filteredSurveysName = new Set(surveysName.filter(s => s).sort((a, b) => (a > b ? 1 : -1)));

  const years = data?.content?.map(s => s.year) ?? [];
  const filteredYears = years.filter(year => year !== undefined && year !== null);
  const sortedYears = Array.from(new Set(filteredYears.sort((a, b) => (a! > b! ? 1 : -1))));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { contacts } = useGetSearchFilter();

  const { onSubmit, onReset, inputProps } = useSearchForm("contacts", contacts);

  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <TextField
            label="Identifiant du contact"
            variant="outlined"
            size="small"
            {...inputProps("identifier")}
          />
          <TextField label="Nom/prénom" variant="outlined" size="small" {...inputProps("name")} />
          <TextField label="Adresse courriel" variant="outlined" size="small" {...inputProps("email")} />
        </Stack>
        <ExpandButton label={"Autres champs de recherche"} handleExpandClick={handleExpandClick} />
        {expanded && (
          <Stack spacing={2}>
            <TextField label="Ville" variant="outlined" size="small" {...inputProps("city")} />
            <TextField label="Fonction" variant="outlined" size="small" {...inputProps("function")} />
            <SearchSurveySelect
              name="surveyId"
              label={"Nom de l'enquête"}
              options={Array.from(filteredSurveysName)}
            />
            <SelectWithOptions
              name="year"
              label={"Année de collecte"}
              options={sortedYears.map(s => s!.toString())}
            />
            <SelectWithOptions name="period" label={"Périodicité"} options={sortedPeriodicities} />
          </Stack>
        )}
        <SearchPanelActions />
      </Stack>
    </form>
  );
};
