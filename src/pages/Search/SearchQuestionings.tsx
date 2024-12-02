import { useState } from "react";
import {
  QuestioningsBaseType,
  useGetSearchFilter,
  useSearchFilterParams,
  useSearchForm,
  useSetSearchFilter,
} from "../../hooks/useSearchFilter.ts";
import Stack from "@mui/material/Stack";
import { Row } from "../../ui/Row.tsx";
import { theme } from "../../theme.tsx";
import { Breadcrumbs } from "../../ui/Breadcrumbs.tsx";
import { Divider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { SearchQuestioningTable } from "../../ui/Questioning/SearchQuestioningTable.tsx";
import { EmptyState } from "../../ui/TableComponents.tsx";
import { useFetchQuery } from "../../hooks/useFetchQuery.ts";
import { MultipleSearchSelect } from "../../ui/Search/MultipleSearchSelect.tsx";
import { collectStatus } from "../../constants/collectStatus.ts";
import { FilterSelect } from "../../ui/FilterSelect.tsx";
import { communicationsList } from "../../constants/communications.ts";
import { SearchQuestioningTextField } from "../../ui/Search/SearchQuestioningTextField.tsx";

const endpoint = "/api/questionings/search";

export const SearchQuestionings = () => {
  const breadcrumbs = [{ href: "/", title: "Accueil" }, "Interrogations"];

  const [tab, setTab] = useState("me");

  const { questionings: questioningFilter } = useGetSearchFilter();
  const setFilter = useSetSearchFilter();

  // filter to remove empty parameters from the query
  const searchFilterParams = Object.fromEntries(
    Object.entries(useSearchFilterParams("questionings"))
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          value = value.filter(v => v !== undefined);
        }
        return [key, value];
      })
      .filter(([, value]) => value !== undefined && !(Array.isArray(value) && value.length === 0)),
  );

  const { data, isLoading } = useFetchQuery(endpoint, {
    query: {
      ...searchFilterParams,
    },
  });

  const questionings = data?.content ?? [];

  const { onReset, inputProps, value, setValue } = useSearchForm("questionings", questioningFilter);

  const hasResetButton = value.searchParam !== "";

  const hasNoQuestioning = !isLoading && questionings.length === 0;

  const onResetSelect = (name: keyof QuestioningsBaseType) => {
    setValue({ ...value, [name]: [] });
    setFilter("questionings", { ...questioningFilter, [name]: [] });
  };

  const onSubmit = (name: keyof QuestioningsBaseType) => {
    setFilter("questionings", { ...questioningFilter, [name]: inputProps(name).value });
  };

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
      <form>
        <Stack sx={{ my: 3, px: 5 }} gap={3}>
          <Row justifyContent={"space-between"}>
            <ToggleButtonGroup
              value={questioningFilter.state}
              exclusive
              onChange={(_, value) => setFilter("questionings", { ...questioningFilter, state: value })}
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
          <SearchQuestioningTextField
            hasResetButton={hasResetButton}
            onReset={() => {
              setFilter("questionings", { ...questioningFilter, "searchParam": "" });
              setValue({ ...questioningFilter, "searchParam": "" });
            }}
            onSubmit={() => onSubmit("searchParam")}
            label={"Rechercher par unité enquêtée ou identifiant de connexion"}
            inputProps={inputProps as any}
          />
          <Row gap={3}>
            <FilterSelect options={[]} label={"Collecte"} name={"campaignId"} />
            <MultipleSearchSelect
              options={collectStatus}
              inputProps={inputProps}
              name={"lastEvent"}
              label={"Statut"}
              onReset={() => onResetSelect("lastEvent")}
              onSubmit={() => onSubmit("lastEvent")}
            />
            <MultipleSearchSelect
              options={communicationsList}
              inputProps={inputProps}
              name={"lastCommunication"}
              label={"Dernière communication"}
              onReset={() => onResetSelect("lastCommunication")}
              onSubmit={() => onSubmit("lastCommunication")}
            />
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
              stateFilter={questioningFilter.state}
              isLoading={isLoading}
              totalCount={data?.totalElements ?? 0}
              questioningFilter={questioningFilter}
              setFilter={setFilter}
            />
          )}
        </Stack>
      </form>
    </Stack>
  );
};
