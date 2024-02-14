import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { z } from "zod";
import { useForm } from "../../../hooks/useForm.ts";
import { APISchemas } from "../../../types/api.ts";
import { Field } from "../../Form/Field.tsx";
import Stack from "@mui/material/Stack";

type Props = {
  open: boolean;
  handleClose: () => void;
  survey: APISchemas["SurveyDto"] | undefined;
};

const schema = z.object({
  openingDate: z.string(),
  closingDate: z.string(),
});

export const SurveyCalendarDialog = ({ open, handleClose, survey }: Props) => {
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
    <Dialog open={open} onClose={handleClose}>
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle>Création nouvelle vague</DialogTitle>
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
