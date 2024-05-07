import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Row } from "../../Row";
import { Button, InputLabel, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  handleSubmitStep: (event: React.FormEvent<HTMLFormElement>) => void;
  handleBack: () => void;
  rights: { idSource?: string; year?: string; periodicity?: string };
};

export const RightsManagementForm = ({ handleSubmitStep, handleBack, rights }: Props) => {
  const navigate = useNavigate();

  const isButtonDisabled = rights.periodicity === "";

  return (
    <Stack>
      <Typography sx={{ pb: 3 }} variant="titleMedium" fontSize={18}>
        Ajouter des droits
      </Typography>
      <Row spacing={1} alignItems={"flex-start"}>
        <InfoOutlinedIcon fontSize="smallIcon" />
        <Typography variant="bodyMedium">
          La sélection d’une source, d’un millésime et d’une période <br /> est nécessaire pour l’ajout
          de droits
        </Typography>
      </Row>
      <form action="#" onSubmit={handleSubmitStep}>
        <Stack gap={2} pt={5}>
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
        <Row pt={4} justifyContent={"space-between"}>
          <Button variant={"text"} onClick={handleBack} sx={{ mr: 1 }}>
            Retour
          </Button>
          <Row>
            <Button variant={"outlined"} onClick={() => navigate(-1)} sx={{ mr: 1 }}>
              Annuler
            </Button>

            <Button variant="contained" type="submit" disabled={isButtonDisabled}>
              Valider
            </Button>
          </Row>
        </Row>
      </form>
    </Stack>
  );
};
