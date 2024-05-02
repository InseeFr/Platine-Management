import TextField from "@mui/material/TextField";
import { useGetSearchFilter, useSearchForm } from "../../hooks/useSearchFilter";
import Stack from "@mui/material/Stack";
import { SearchPanelActions } from "./SearchPanelActions";

export const SearchSurveyUnitsForm = () => {
  const { surveyUnits } = useGetSearchFilter();

  const { onSubmit, onReset, inputProps } = useSearchForm("surveyUnits", surveyUnits);

  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <TextField
            label="Identifiant unité enquêtée"
            variant="outlined"
            size="small"
            {...inputProps("idSu")}
          />
          <TextField
            label="SIREN"
            variant="outlined"
            size="small"
            {...inputProps("identificationCode")}
          />
          <TextField
            label="Raison sociale"
            variant="outlined"
            size="small"
            {...inputProps("identificationName")}
          />
        </Stack>
        <SearchPanelActions />
      </Stack>
    </form>
  );
};
