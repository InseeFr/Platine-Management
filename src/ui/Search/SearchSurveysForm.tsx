import { SearchSurveySelect } from "./SearchSurveySelect.tsx";
import { useFetchQuery } from "../../hooks/useFetchQuery.ts";
import { SelectWithOptions } from "../Form/SelectWithOptions.tsx";

// TODO : Replace with true data
const names = ["AQV", "a1", "a2", "a3", "a4", "a5"];
const years = ["2024", "2023", "2022"];

export const SearchSurveysForm = () => {
  const { data } = useFetchQuery("/api/periodicities");

  const sortedPeriodicities = data?.sort((a, b) => (a.label > b.label ? 1 : -1)) ?? [];

  return (
    <>
      <SearchSurveySelect name="surveyId" label={"Nom de l'enquête"} options={names} />
      <SelectWithOptions name="year" label={"Année de collecte"} options={years} />
      <SelectWithOptions name="period" label={"Périodicité"} options={sortedPeriodicities} />
    </>
  );
};
