import { FormEventHandler, useState } from "react";
import {
  useGetSearchFilter,
  useSearchFilterParams,
  useSearchForm,
} from "../../hooks/useSearchFilter.ts";
import Stack from "@mui/material/Stack";
import { Row } from "../../ui/Row.tsx";
import { theme } from "../../theme.tsx";
import { Breadcrumbs } from "../../ui/Breadcrumbs.tsx";
import { Divider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { SearchQuestioningTable } from "../../ui/Questioning/SearchQuestioningTable.tsx";
import { EmptyState } from "../../ui/TableComponents.tsx";
import { FilterSelect } from "../../ui/FilterSelect.tsx";
import { SearchSelectStatus } from "../../ui/Questioning/SearchSelectStatus.tsx";
import { SearchTextField } from "../../ui/SearchTextField.tsx";
import { useFetchQuery } from "../../hooks/useFetchQuery.ts";

const endpoint = "/api/questionings/search";

export const SearchQuestionings = () => {
  const breadcrumbs = [{ href: "/", title: "Accueil" }, "Interrogations"];

  const [tab, setTab] = useState("me");
  const [stateFilter, setStateFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { questionings: questioningFilter } = useGetSearchFilter();

  const { data, isLoading } = useFetchQuery(endpoint, {
    query: {
      ...useSearchFilterParams("questionings"),
      page: page,
      pageSize: rowsPerPage,
    },
  });

  const questionings = data?.content ?? [];

  const { onSubmit, onReset, inputProps, value } = useSearchForm("questionings", questioningFilter);

  const handleSubmit: FormEventHandler = e => {
    onSubmit(e);
  };

  const handleReset: FormEventHandler = e => {
    onReset(e);
  };

  const hasResetButton = value.searchParam !== "";

  const hasNoQuestioning = !isLoading && questionings.length === 0;

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
          <Typography variant="headlineLarge" component="h1">
            Interrogations
          </Typography>
        </Stack>
        <Row justifyContent={"space-between"}>
          <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => setTab(v)}>
            <ToggleButton value="me" size="large">
              Mon portefeuille
            </ToggleButton>
            <ToggleButton value="all" size="large">
              Tous les portefeuilles
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>
      </Row>
      <Divider variant="fullWidth" />
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Stack sx={{ my: 3, px: 5 }} gap={3}>
          <Row justifyContent={"space-between"}>
            <ToggleButtonGroup
              value={stateFilter}
              exclusive
              onChange={(_, v) => setStateFilter(v)}
              sx={{
                boxShadow: "none",
                ".MuiToggleButtonGroup-grouped:not(:first-of-type)": {
                  border: `1px solid ${theme.palette.border.default}`,
                },
              }}
            >
              <ToggleButton
                value="all"
                size="large"
                sx={{ border: `1px solid ${theme.palette.border.default}` }}
              >
                Toutes
              </ToggleButton>
              <ToggleButton value="notReceived" size="large">
                Non reçues
              </ToggleButton>
              <ToggleButton value="received" size="large">
                Reçues
              </ToggleButton>
              <ToggleButton value="recovery" size="large">
                En reprise
              </ToggleButton>
            </ToggleButtonGroup>
          </Row>
          <SearchTextField
            hasResetButton={hasResetButton}
            label={"Rechercher par unité enquêtée ou identifiant de connexion"}
            inputProps={inputProps}
          />
          <Row gap={3}>
            <FilterSelect options={[]} label={"Collecte"} name={"campaignId"} />
            <SearchSelectStatus />
            <FilterSelect options={[]} label={"Dernière communication"} name={"lastCommunication"} />
          </Row>
          {hasNoQuestioning && (
            <EmptyState
              isFiltered={hasResetButton}
              text={"Aucune interrogation trouvée."}
              onReset={onReset}
            />
          )}
          {!hasNoQuestioning && (
            <SearchQuestioningTable
              questionings={questionings}
              stateFilter={stateFilter}
              isLoading={isLoading}
              totalCount={data?.totalElements ?? 0}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          )}
        </Stack>
      </form>
    </Stack>
  );
};
