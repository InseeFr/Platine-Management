import Stack from "@mui/material/Stack";
import { SearchButton } from "./SearchButton";
import { useState } from "react";
import { SearchSurveySelect } from "./SearchSurveySelect";

type SearchSurveyTabContentProps = {
  surveys?: { shortWording: string; year: string; periodicity: string }[]; // TODO: create Survey type to use Survey[]
};

export const SearchSurveyTabContent = ({ surveys }: SearchSurveyTabContentProps) => {
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedPeriodicity, setSelectedPeriodicity] = useState<string>("");

  const handleSearch = () => {
    console.log({ selectedLabel, selectedYear, selectedPeriodicity });
  };

  return (
    <Stack spacing={3} m={3}>
      <Stack spacing={2}>
        <SearchSurveySelect
          label={"Nom de l'enquête"}
          value={selectedLabel}
          options={surveys?.map(survey => survey.shortWording)}
          handleChange={(value: string) => setSelectedLabel(value)}
        />
        <SearchSurveySelect
          label={"Année de collecte"}
          value={selectedYear}
          handleChange={(value: string) => setSelectedYear(value)}
          options={surveys?.map(survey => survey.year)}
        />
        <SearchSurveySelect
          label={"Périodicité"}
          value={selectedPeriodicity}
          handleChange={(value: string) => setSelectedPeriodicity(value)}
          options={surveys?.map(survey => survey.periodicity)}
        />
      </Stack>
      <SearchButton handleSearch={handleSearch} />
    </Stack>
  );
};
