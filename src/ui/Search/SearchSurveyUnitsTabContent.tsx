import TextField from "@mui/material/TextField";

export const SearchSurveyUnitsTabContent = () => {
  return (
    <>
      <TextField id="idSu" label="Identifiant unité enquêtée" variant="outlined" size="small" />
      <TextField id="identificationCode" label="SIREN" variant="outlined" size="small" />
      <TextField id="identificationName" label="Raison sociale" variant="outlined" size="small" />
    </>
  );
};
