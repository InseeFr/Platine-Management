import { Divider, Stack } from "@mui/material";
import { Row } from "../../ui/Row.tsx";
import { useInfiniteFetchQuery } from "../../hooks/useFetchQuery.ts";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { FormEventHandler, useState } from "react";
import Typography from "@mui/material/Typography";
import { useGetSearchFilter, useSearchForm } from "../../hooks/useSearchFilter.ts";
import { Breadcrumbs } from "../../ui/Breadcrumbs.tsx";
import { theme } from "../../theme.tsx";
import { EmptyState } from "../../ui/TableComponents.tsx";
import { SearchSurveyUnitTable } from "../../ui/SurveyUnit/SearchSurveyUnitTable.tsx";
import { SearchTextField } from "../../ui/SearchTextField.tsx";

const endpoint = "/api/survey-units/search";

export const SearchSurveyUnits = () => {
  const breadcrumbs = [{ href: "/", title: "Accueil" }, "Unités enquêtées"];

  const {
    results: surveyUnits,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteFetchQuery(endpoint);

  const [tab, setTab] = useState("me");

  const { surveyUnits: surveyUnitsFilter } = useGetSearchFilter();
  const [valueSubmitted, setValueSubmitted] = useState(surveyUnitsFilter.search);

  const { onSubmit, onReset, inputProps, value } = useSearchForm("surveyUnits", surveyUnitsFilter);

  const handleSubmit: FormEventHandler = e => {
    setValueSubmitted(value.search);
    onSubmit(e);
  };

  const handleReset: FormEventHandler = e => {
    setValueSubmitted("");
    onReset(e);
  };

  const isResetButton = valueSubmitted === value.search && value.search !== "";

  const hasNoSurveyUnits = !isLoading && (surveyUnits === undefined || surveyUnits.length === 0);

  return (
    <Stack>
      <Row
        justifyContent={"space-between"}
        px={6}
        py={3}
        sx={{ backgroundColor: theme.palette.Surfaces.Secondary }}
      >
        <Stack>
          <Breadcrumbs items={breadcrumbs} />
          <Typography variant="headlineLarge">Unités enquêtées</Typography>
        </Stack>
        <Row justifyContent={"space-between"}>
          <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => setTab(v)}>
            <ToggleButton value="me" aria-label="left aligned" size="large">
              Mes unités enquêtées
            </ToggleButton>
            <ToggleButton value="all" aria-label="left aligned" size="large">
              Toutes les unités enquêtées
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>
      </Row>
      <Divider variant="fullWidth" />
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Stack sx={{ my: 3, px: 5 }} gap={3}>
          <SearchTextField
            isResetButton={isResetButton}
            label={"Rechercher par id technique, id métier, raison sociale ou contact"}
            inputProps={inputProps}
          />
          {hasNoSurveyUnits ? (
            <EmptyState
              isFiltered={isResetButton}
              onReset={handleReset}
              text={"Aucune unité enquêtée trouvée."}
            />
          ) : (
            <SearchSurveyUnitTable
              surveyUnits={surveyUnits}
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              onVisible={fetchNextPage}
            />
          )}
        </Stack>
      </form>
    </Stack>
  );
};
