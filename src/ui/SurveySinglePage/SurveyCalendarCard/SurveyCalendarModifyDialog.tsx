import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { z } from "zod";
import { useForm } from "../../../hooks/useForm.ts";
import { APISchemas } from "../../../types/api.ts";
import { Field } from "../../Form/Field.tsx";
import Stack from "@mui/material/Stack";
import moment from "moment";

type Props = {
  open: boolean;
  handleClose: () => void;
  survey: APISchemas["SurveyDto"] | undefined;
  campPartition: Array<APISchemas["CampaignPartitioningsDto"]>;
};

const schema = z.object({
  openingDate: z.string(),
  closingDate: z.string(),
});

export const SurveyCalendarModifyDialog = ({ open, handleClose, survey, campPartition }: Props) => {
  const { register, control, errors, handleSubmit } = useForm(schema, {
    defaultValues: {
      openingDate: "",
      closingDate: "",
    },
  });

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle>{"Modification"}</DialogTitle>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#EBEFF5" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Année de collecte
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Période de collecte
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Vague
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Date d'ouverture
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Date de retour attendu
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Date de fermeture
                </TableCell>
                <TableCell align="center">Date de relance</TableCell>
                <TableCell align="center">Date de mise en demeure</TableCell>
                <TableCell align="center">Date de constat de non réponse</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campPartition
                .sort((a, b) => (a.id! > b.id! ? 1 : -1))
                .map(
                  p =>
                    p.partitionings
                      ?.sort((a, b) => (a.id! > b.id! ? 1 : -1))
                      .map(part => (
                        <TableRow key={part.id}>
                          <TableCell align="center" sx={{ borderBottom: "none" }}>
                            {survey?.year}
                          </TableCell>
                          <TableCell align="center">
                            {survey?.id ? p.id?.replace(survey?.id, "") : ""}
                          </TableCell>
                          <TableCell align="center">{p.id ? part.id?.replace(p.id, "") : ""}</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700 }}>
                            {moment(part.openingDate).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700 }}>
                            {moment(part.returnDate).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700 }}>
                            {moment(part.closingDate).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell align="center">{"not provided"}</TableCell>
                          <TableCell align="center">{"not provided"}</TableCell>
                          <TableCell align="center">{"not provided"}</TableCell>
                        </TableRow>
                      )),
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogContent>
          <Stack gap={3}></Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit" variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
