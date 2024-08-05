import { FormEventHandler, useState } from "react";
import { useGetSearchFilter, useSearchForm } from "../../hooks/useSearchFilter.ts";
import Stack from "@mui/material/Stack";
import { Row } from "../../ui/Row.tsx";
import { theme } from "../../theme.tsx";
import { Breadcrumbs } from "../../ui/Breadcrumbs.tsx";
import { SearchTextField } from "../../ui/SearchTextField.tsx";
import { Divider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { SearchQuestioningTable } from "../../ui/Questioning/SearchQuestioningTable.tsx";
import { EmptyState } from "../../ui/TableComponents.tsx";

export const SearchQuestionings = () => {
  const breadcrumbs = [{ href: "/", title: "Accueil" }, "Interrogations"];

  const [tab, setTab] = useState("me");
  const [stateFilter, setStateFilter] = useState("all");

  const { questionings: questioningFilter } = useGetSearchFilter();
  const [submittedValue, setSubmittedValue] = useState(questioningFilter.searchValue);

  const { onSubmit, onReset, inputProps, value } = useSearchForm("questionings", questioningFilter);

  const handleSubmit: FormEventHandler = e => {
    setSubmittedValue(value.searchValue);
    onSubmit(e);
  };

  const handleReset: FormEventHandler = e => {
    setSubmittedValue("");
    onReset(e);
  };

  const isResetButton = submittedValue === value.searchValue && value.searchValue !== "";

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
          <Typography variant="headlineLarge">Interrogations</Typography>
        </Stack>
        <Row justifyContent={"space-between"}>
          <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => setTab(v)}>
            <ToggleButton value="me" aria-label="left aligned" size="large">
              Mon portefeuille
            </ToggleButton>
            <ToggleButton value="all" aria-label="left aligned" size="large">
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
            isResetButton={isResetButton}
            label={"Rechercher par identifiant métier ou contact ou unité enquêtée"}
            inputProps={inputProps}
          />
          {/* TODO: add filters when get specs 
           <Row gap={3}>
            <FilterSelect
              options={[]}
              label={"Campagne"}
              name={"campaign"}
            />
            <FilterSelect
              options={[]}
              label={"Statut"}
              name={"status"}
            />
            <FilterSelect
              options={[]}
              label={"Dernière communication"}
              name={"lastCommunication"}
            />
          </Row> */}
          {/* TODO: rework condition when get data */}
          {submittedValue && (
            <EmptyState isFiltered={isResetButton} text={"Aucune interrogation trouvée."} />
          )}
          {!submittedValue && <SearchQuestioningTable />}
        </Stack>
      </form>
    </Stack>
  );
};
