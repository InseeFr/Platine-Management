import { Divider, Stack } from "@mui/material";
import { useInfiniteFetchQuery } from "../../hooks/useFetchQuery.ts";
import { FormEventHandler, useState } from "react";
import {
  useGetSearchFilter,
  useSearchFilterParams,
  useSearchForm,
} from "../../hooks/useSearchFilter.ts";
import { SearchSurveyUnitTable } from "../../ui/SurveyUnit/SearchSurveyUnitTable.tsx";
import { useNavigate } from "react-router-dom";
import { SearchFilters } from "../../ui/Search/SearchFilters.tsx";
import { SearchSurveyUnitsHeader } from "../../ui/Search/SearchSurveyUnitsHeader.tsx";
import { SearchSurveyUnitsEmptyState } from "../../ui/Search/SearchSurveyUnitsEmptyState.tsx";
import { theme } from "../../theme.tsx";

const endpoint = "/api/survey-units/search";

const options = [
  { label: "ID métier", value: "code" },
  { label: "Raison sociale", value: "name" },
];
export const SearchSurveyUnits = () => {
  const navigate = useNavigate();

  const { surveyUnits: surveyUnitsFilter } = useGetSearchFilter();
  const [submittedValue, setSubmittedValue] = useState(surveyUnitsFilter);

  // isRedirected determines whether or not to redirect when there is only one result
  const [isRedirected, setIsRedirected] = useState(false);

  const {
    results: surveyUnits,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isSuccess,
  } = useInfiniteFetchQuery(
    endpoint,
    {
      query: { ...useSearchFilterParams("surveyUnits"), pageSize: 20, sort: "id_su" },
    },
    !!surveyUnitsFilter.searchParam,
  );

  const [tab, setTab] = useState("me");

  const { onSubmit, onReset, inputProps, value, onChangeSearchType } = useSearchForm(
    "surveyUnits",
    surveyUnitsFilter,
  );

  const handleSubmit: FormEventHandler = e => {
    setSubmittedValue(value);
    setIsRedirected(true);
    onSubmit(e);
  };

  const handleReset: FormEventHandler = e => {
    setSubmittedValue({ searchParam: "", searchType: "" });
    onReset(e);
  };

  const isResetButton =
    submittedValue.searchParam === value.searchParam &&
    value.searchParam !== "" &&
    submittedValue.searchType === value.searchType;

  const hasNoSurveyUnits =
    !isLoading &&
    surveyUnitsFilter.searchParam &&
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

  if (surveyUnits.length === 1 && isRedirected) {
    navigate(`/survey-units/${surveyUnits[0].idSu}`);
    setIsRedirected(false);
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
          sx={{ px: 6, pb: 3, backgroundColor: theme.palette.Surfaces.Secondary }}
        />
      </Stack>
      <Divider variant="fullWidth" />

      <Stack sx={{ my: 3, px: 5 }} gap={3}>
        {submittedValue && hasNoSurveyUnits && (
          <SearchSurveyUnitsEmptyState
            onChangeSearchType={onChangeSearchType}
            searchType={surveyUnitsFilter.searchType}
            search={surveyUnitsFilter.searchParam}
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
