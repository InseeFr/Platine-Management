import Stack from "@mui/material/Stack";
import { SearchButton } from "./SearchButton";
import TextField from "@mui/material/TextField";

export const SearchSurveyUnitsTabContent = () => {
  const handleSearch = () => {};

  return (
    <Stack spacing={3} m={3}>
      <Stack spacing={2}>
        <TextField id="idSu" label="Identifiant unité enquêtée" variant="outlined" size="search" />
        <TextField id="identificationCode" label="SIREN" variant="outlined" size="search" />
        <TextField id="identificationName" label="Raison sociale" variant="outlined" size="search" />
      </Stack>
      <SearchButton handleSearch={handleSearch} />
    </Stack>
  );
};
