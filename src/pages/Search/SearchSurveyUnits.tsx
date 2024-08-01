import { Divider, Stack } from "@mui/material";
import { useInfiniteFetchQuery } from "../../hooks/useFetchQuery.ts";
import { FormEventHandler, useState } from "react";
import { useGetSearchFilter, useSearchForm } from "../../hooks/useSearchFilter.ts";
import { theme } from "../../theme.tsx";
import { SearchSurveyUnitTable } from "../../ui/SurveyUnit/SearchSurveyUnitTable.tsx";
import { useNavigate } from "react-router-dom";
import { SearchFilters } from "../../ui/Search/SearchFilters.tsx";
import { SearchSurveyUnitsHeader } from "../../ui/Search/SearchSurveyUnitsHeader.tsx";
import { SearchSurveyUnitsEmptyState } from "../../ui/Search/SearchSurveyUnitsEmptyState.tsx";

const endpoint = "/api/survey-units/search";

const options = [
  { label: "ID métier", value: "identificationCode" },
  { label: "Raison sociale", value: "identificationName" },
];
export const SearchSurveyUnits = () => {
  const navigate = useNavigate();

  const { surveyUnits: surveyUnitsFilter } = useGetSearchFilter();
  const [submittedValue, setSubmittedValue] = useState(surveyUnitsFilter.searchValue);
  const [submittedType, setSubmittedType] = useState(surveyUnitsFilter.searchType);
  const [isAlreadyRedirected, setIsAlreadyRedirected] = useState(false);

  const {
    results: surveyUnits,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isSuccess,
  } = useInfiniteFetchQuery(
    endpoint,
    // {
    //   query: useSearchFilterParams("surveyUnits"),
    // },
    // !!surveyUnitsFilter.search,
  );

  const [tab, setTab] = useState("me");

  const { onSubmit, onReset, inputProps, value, onChangeSearchType } = useSearchForm(
    "surveyUnits",
    surveyUnitsFilter,
  );

  const handleSubmit: FormEventHandler = e => {
    setSubmittedValue(value.searchValue);
    setSubmittedType(value.searchType);
    setIsAlreadyRedirected(true);
    onSubmit(e);
  };

  const handleReset: FormEventHandler = e => {
    setSubmittedValue("");
    setSubmittedType("");
    onReset(e);
  };

  const isResetButton =
    submittedValue === value.searchValue &&
    value.searchValue !== "" &&
    submittedType === value.searchType;

  const hasNoSurveyUnits =
    !isLoading &&
    surveyUnitsFilter.searchValue &&
    (surveyUnits === undefined || surveyUnits.length === 0);

  if ((!surveyUnits || surveyUnits.length === 0) && !isSuccess && !isLoading) {
    return (
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <SearchSurveyUnitsHeader tab={tab} onChangeTab={(_, v) => setTab(v)} />
        <Divider variant="fullWidth" />

        <Stack sx={{ my: 3, px: 5 }} gap={3} alignItems={"center"}>
          <SearchFilters
            isResetButton={isResetButton}
            inputProps={inputProps}
            textFieldLabel="Rechercher une unité enquêtée par id métier ou raison sociale"
            options={options}
            sx={{ width: "50vw", height: "50vh", minWidth: "700px" }}
          />
        </Stack>
      </form>
    );
  }

  if (surveyUnits.length === 1 && isAlreadyRedirected) {
    navigate(`/survey-units/${surveyUnits[0].idSu}`);
    setIsAlreadyRedirected(false);
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <Stack>
        <SearchSurveyUnitsHeader tab={tab} onChangeTab={(_, v) => setTab(v)} />
        <SearchFilters
          isResetButton={isResetButton}
          inputProps={inputProps}
          textFieldLabel="Rechercher une unité enquêtée par id métier ou raison sociale"
          options={options}
          sx={{ backgroundColor: theme.palette.Surfaces.Secondary, px: 6, pb: 3 }}
        />
      </Stack>
      <Divider variant="fullWidth" />

      <Stack sx={{ my: 3, px: 5 }} gap={3}>
        {submittedValue && hasNoSurveyUnits && (
          <SearchSurveyUnitsEmptyState
            onChangeSearchType={onChangeSearchType}
            searchType={surveyUnitsFilter.searchType}
            search={surveyUnitsFilter.searchValue}
          />
        )}
        {submittedValue && !hasNoSurveyUnits && (
          <SearchSurveyUnitTable
            surveyUnits={surveyUnits}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            onVisible={fetchNextPage}
          />
        )}
      </Stack>
    </form>
  );
};
