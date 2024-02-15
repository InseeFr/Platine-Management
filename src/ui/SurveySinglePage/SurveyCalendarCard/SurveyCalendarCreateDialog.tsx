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
  campPartition: APISchemas["CampaignPartitioningsDto"];
};

const schema = z.object({
  openingDate: z.string(),
  closingDate: z.string(),
  returnDate: z.string(),
  wave: z.string(),
  periodicity: z.string(),
});

export const SurveyCalendarCreateDialog = ({ open, handleClose, survey, campPartition }: Props) => {
  const { register, control, errors, handleSubmit } = useForm(schema, {
    defaultValues: {
      wave: campPartition.partitionings?.map(p => p.id)[0].replace(campPartition.id, ""),
      periodicity: campPartition.period?.toString(),
      openingDate: moment(campPartition.partitionings?.map(p => p.openingDate)[0]).format("DD/MM/YYYY"),
      closingDate: moment(campPartition.partitionings?.map(p => p.closingDate)[0]).format("DD/MM/YYYY"),
      returnDate: moment(campPartition.partitionings?.map(p => p.returnDate)[0]).format("DD/MM/YYYY"),
    },
  });

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle>Création nouvelle vague</DialogTitle>
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
              <TableRow key={survey?.id}>
                <TableCell align="center" sx={{ borderBottom: "none" }}>
                  {survey?.year}
                </TableCell>
                <TableCell align="center">
                  <Field error={errors.periodicity?.message} {...register("periodicity")} />
                </TableCell>
                <TableCell align="center">
                  <Field error={errors.wave?.message} {...register("wave")} />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  <Field error={errors.openingDate?.message} {...register("openingDate")} />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  <Field error={errors.returnDate?.message} {...register("returnDate")} />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  <Field error={errors.closingDate?.message} {...register("closingDate")} />
                </TableCell>
                <TableCell align="center">{"not provided"}</TableCell>
                <TableCell align="center">{"not provided"}</TableCell>
                <TableCell align="center">{"not provided"}</TableCell>
              </TableRow>
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
