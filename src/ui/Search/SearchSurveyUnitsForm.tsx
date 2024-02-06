import TextField from "@mui/material/TextField";

export const SearchSurveyUnitsForm = () => {
  return (
    <>
      <TextField
        name="idSu"
        id="idSu"
        label="Identifiant unité enquêtée"
        variant="outlined"
        size="small"
      />
      <TextField
        name="identificationCode"
        id="identificationCode"
        label="SIREN"
        variant="outlined"
        size="small"
      />
      <TextField
        name="identificationName"
        id="identificationName"
        label="Raison sociale"
        variant="outlined"
        size="small"
      />
    </>
  );
};
