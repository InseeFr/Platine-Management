import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { z } from "zod";
import { useForm } from "../../../hooks/useForm.ts";
import { APISchemas } from "../../../types/api.ts";
import { Field } from "../../Form/Field.tsx";
import Stack from "@mui/material/Stack";

type Props = {
  open: boolean;
  handleClose: () => void;
  contact: APISchemas["ContactFirstLoginDto"];
};

const schema = z.object({
  civility: z.enum(["Female", "Male", "Undefined"]),
  lastName: z.string().min(10),
  firstName: z.string().min(10),
});

const civilities = [
  { label: "Madame", value: "Female" },
  { label: "Monsieur", value: "Male" },
];

export const ContactDetailsDialog = ({ open, handleClose, contact }: Props) => {
  const { register, control, errors, handleSubmit } = useForm(schema, {
    defaultValues: contact,
  });

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle>Modification des coordonnées</DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            <Field
              control={control}
              label="Civilité"
              name="civility"
              type="radios"
              options={civilities}
            />
            <Field label="Prénom" error={errors.firstName?.message} {...register("firstName")} />
            <Field label="Nom" error={errors.lastName?.message} {...register("lastName")} />
          </Stack>
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
