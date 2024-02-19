import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { z } from "zod";
import { useForm } from "../../hooks/useForm.ts";
import { APISchemas } from "../../types/api.ts";
import { Field } from "../Form/Field.tsx";
import Stack from "@mui/material/Stack";
import { useFetchMutation } from "../../hooks/useFetchQuery.ts";

type Props = {
  open: boolean;
  onClose: () => void;
  survey: APISchemas["SurveyDto"];
  onSave: () => void;
};

const schema = z.object({
  id: z.string(),
  sourceId: z.string(),
  year: z.number(),
  sampleSize: z.number(),
  longWording: z.string(),
  shortWording: z.string(),
  shortObjectives: z.string(),
  visaNumber: z.string(),
  cnisUrl: z.string(),
  diffusionUrl: z.string(),
  noticeUrl: z.string(),
  specimenUrl: z.string(),
  communication: z.string(),
});

const styles = {
  Grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr 1fr",
    gap: "40px",
  },
};

export const SurveyFormDialog = ({ open, onClose, survey, onSave }: Props) => {
  const defaultValues = survey;
  const { register, errors, handleSubmit } = useForm(schema, {
    defaultValues: defaultValues,
  });

  const { mutateAsync, isPending } = useFetchMutation("/api/surveys/{id}", "put");

  const onSubmit = handleSubmit(async data => {
    console.log({ data });
    await mutateAsync({ body: data, urlParams: { id: survey.id } });
    onSave();
  });

  console.log({ errors });

  return (
    <Dialog open={open} onClose={onClose} sx={{ ".MuiPaper-root": { maxWidth: "1160px", px: 3 } }}>
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle>Modification des métadonnées de l'enquête</DialogTitle>
        <DialogContent>
          <Box sx={styles.Grid}>
            <Stack gap={4}>
              <Field
                label="Libellé court"
                error={errors.shortWording?.message}
                {...register("shortWording")}
              />
              <Field
                label="Libellé long"
                error={errors.longWording?.message}
                {...register("longWording")}
              />
              <Field
                sx={{ height: "300px" }}
                label="Objectif long"
                error={errors.shortObjectives?.message}
                {...register("shortObjectives")}
              />
            </Stack>
            <Divider orientation="vertical" variant="middle" />
            <Stack gap={4} pt={7}>
              <Field
                label="Numéro de visa"
                error={errors.visaNumber?.message}
                {...register("visaNumber")}
              />
              <Field label="URL CNIS" error={errors.cnisUrl?.message} {...register("cnisUrl")} />

              {/*  <Field
                type="select"
                label="Caractére obligatoire"
                selectoptions={streetType}
                defaultValue={contact.address?.streetType}
                error={errors.address?.streetType?.message}
                {...register("address.streetType")}
              /> */}
            </Stack>
            <Stack gap={4} pt={7}>
              <Field
                label="URL de diffusion"
                error={errors.diffusionUrl?.message}
                {...register("diffusionUrl")}
              />
              <Field label="URL notice" error={errors.noticeUrl?.message} {...register("noticeUrl")} />
              <Field
                label="URL spécimen"
                error={errors.specimenUrl?.message}
                {...register("specimenUrl")}
              />
            </Stack>
          </Box>
        </DialogContent>
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
