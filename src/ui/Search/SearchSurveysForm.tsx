import { SearchSurveySelect } from "./SearchSurveySelect.tsx";
import { useFetchQuery } from "../../hooks/useFetchQuery.ts";
import { SelectWithOptions } from "../Form/SelectWithOptions.tsx";
import Stack from "@mui/material/Stack";
import { SearchPanelActions } from "./SearchPanelActions.tsx";
import { useGetSearchFilter, useSearchForm } from "../../hooks/useSearchFilter.ts";

// TODO : Replace with true data
const names = ["AQV", "a1", "a2", "a3", "a4", "a5"];
const years = ["2024", "2023", "2022"];

export const SearchSurveysForm = () => {
  const { data } = useFetchQuery("/api/periodicities");

  const { surveys } = useGetSearchFilter();

  const { onSubmit, onReset, inputProps } = useSearchForm("surveys", surveys);

  const sortedPeriodicities = data?.sort((a, b) => (a.label > b.label ? 1 : -1)) ?? [];

  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <SearchSurveySelect label={"Nom de l'enquête"} options={names} {...inputProps("idSource")} />
          <SelectWithOptions label={"Année de collecte"} options={years} {...inputProps("year")} />
          <SelectWithOptions
            label={"Périodicité"}
            options={sortedPeriodicities}
            {...inputProps("periodicity")}
          />
        </Stack>
        <SearchPanelActions />
      </Stack>
    </form>
  );
};
