import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { z } from "zod";
import { useForm } from "../../hooks/useForm.ts";
import { APISchemas } from "../../types/api.ts";
import { useFetchMutation } from "../../hooks/useFetchQuery.ts";
import { addressSchema } from "../Contact/ContactFormDialog.tsx";

type Props = {
  open: boolean;
  onClose: () => void;
  surveyUnit: APISchemas["SurveyUnitDto"];
  onSave: () => void;
};

const schema = z.object({
  identificationName: z.string(),
  identificationCode: z.string().optional(),
  // add "groupe", "niveau de gestion", "qualité" et "taille"
  address: addressSchema,
});

export const SurveyUnitFormDialog = ({ open, onClose, surveyUnit, onSave }: Props) => {
  const defaultValues = surveyUnit.address?.countryName
    ? surveyUnit
    : { ...surveyUnit, address: { ...surveyUnit.address, countryName: "France" } };
  const { handleSubmit } = useForm(schema, {
    defaultValues: defaultValues,
  });

  const { mutateAsync, isPending } = useFetchMutation("/api/survey-units/{id}", "put");

  const onSubmit = handleSubmit(async data => {
    await mutateAsync({
      body: { ...data, idSu: surveyUnit.idSu },
      urlParams: { id: surveyUnit.idSu },
    });
    onSave();
  });

  return (
    <Dialog open={open} onClose={onClose} sx={{ ".MuiPaper-root": { maxWidth: "1160px", px: 3 } }}>
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle>Modification des informations</DialogTitle>
        <DialogContent>{/* TODO: add form if we can modify survey unit */}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isPending}>
            Annuler
          </Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            Enregistrer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
