import TextField from "@mui/material/TextField";

type Props = {
  filters: { idSu: string; identificationCode: string; identificationName: string };
};

export const SearchSurveyUnitsForm = ({ filters }: Props) => {
  return (
    <>
      <TextField
        defaultValue={filters.idSu}
        name="idSu"
        id="idSu"
        label="Identifiant unité enquêtée"
        variant="outlined"
        size="small"
      />
      <TextField
        defaultValue={filters.identificationCode}
        name="identificationCode"
        id="identificationCode"
        label="SIREN"
        variant="outlined"
        size="small"
      />
      <TextField
        defaultValue={filters.identificationName}
        name="identificationName"
        id="identificationName"
        label="Raison sociale"
        variant="outlined"
        size="small"
      />
    </>
  );
};
