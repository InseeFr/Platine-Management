import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Row } from "../../Row";
import { Button, InputLabel, TextField } from "@mui/material";

type Props = {
  handleSubmitStep: (event: React.FormEvent<HTMLFormElement>) => void;
  handleBack: () => void;
};

export const RightsManagementForm = ({ handleSubmitStep, handleBack }: Props) => {
  return (
    <Stack>
      <Typography sx={{ pb: 3 }} variant="titleMedium" fontSize={18}>
        Ajouter des droits
      </Typography>
      <Row spacing={1} alignItems={"flex-start"}>
        <InfoOutlinedIcon fontSize="smallIcon" />
        <Typography variant="bodyMedium">
          La sélection de l’identifiant de l’unité enquêtée, d’une source, d’un millésime <br /> et d’une
          période est nécessaire pour l’ajout de droits
        </Typography>
      </Row>
      <form action="#" onSubmit={handleSubmitStep}>
        <Stack gap={2} pt={5}>
          <Row gap={3}>
            <InputLabel
              id="id"
              sx={{ typography: "bodyMedium", fontWeight: "700", color: "black.main" }}
            >
              Identifiant du compte
            </InputLabel>
            <TextField sx={{ width: "300px" }} id="id" variant="outlined" size="small" />
          </Row>
          <Row gap={3} justifyContent={"space-between"}>
            <InputLabel
              id="idSu"
              sx={{ typography: "bodyMedium", fontWeight: "700", color: "black.main" }}
            >
              Identifiant de l’unité enquêtée
            </InputLabel>
            <TextField sx={{ width: "300px" }} id="idSu" variant="outlined" size="small" />
          </Row>
          <Row gap={3} justifyContent={"space-between"}>
            <InputLabel
              id="idSource"
              sx={{ typography: "bodyMedium", fontWeight: "700", color: "black.main" }}
            >
              Source
            </InputLabel>
            <TextField sx={{ width: "300px" }} id="idSource" variant="outlined" size="small" />
          </Row>
          <Row gap={3} justifyContent={"space-between"}>
            <InputLabel
              id="year"
              sx={{ typography: "bodyMedium", fontWeight: "700", color: "black.main" }}
            >
              Millésime
            </InputLabel>
            <TextField sx={{ width: "300px" }} id="year" variant="outlined" size="small" />
          </Row>
          <Row gap={3} justifyContent={"space-between"}>
            <InputLabel
              id="period"
              sx={{ typography: "bodyMedium", fontWeight: "700", color: "black.main" }}
            >
              Période
            </InputLabel>
            <TextField sx={{ width: "300px" }} id="period" variant="outlined" size="small" />
          </Row>
        </Stack>
        <Row pt={4} justifyContent={"flex-end"}>
          <Button variant={"outlined"} onClick={handleBack} sx={{ mr: 1 }}>
            Annuler
          </Button>

          <Button variant="contained" type="submit">
            Suivant
          </Button>
        </Row>
      </form>
    </Stack>
  );
};
