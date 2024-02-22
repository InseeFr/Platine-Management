import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { z } from "zod";
import { useForm } from "../../hooks/useForm.ts";
import { APISchemas } from "../../types/api.ts";
import { Field } from "../Form/Field.tsx";
import Stack from "@mui/material/Stack";
import { Row } from "../Row.tsx";
import { useFetchMutation } from "../../hooks/useFetchQuery.ts";
import { countries } from "../../constants/countries.ts";
import { addressSchema, repetitionIndex, streetType, styles } from "../Contact/ContactFormDialog.tsx";

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
  const { register, errors, handleSubmit } = useForm(schema, {
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

  console.log({ errors });

  return (
    <Dialog open={open} onClose={onClose} sx={{ ".MuiPaper-root": { maxWidth: "1160px", px: 3 } }}>
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle>Modification des informations</DialogTitle>
        <DialogContent>
          <Box sx={styles.Grid}>
            <Stack gap={4} pt={1}>
              <Field
                label="Raison sociale"
                error={errors.identificationName?.message}
                {...register("identificationName")}
              />
              <Row gap={2}>
                <Field
                  sx={{ width: "100px" }}
                  label="N° de voie"
                  error={errors.address?.streetNumber?.message}
                  {...register("address.streetNumber")}
                />
                <Box sx={{ width: "200px" }}>
                  <Field
                    type="select"
                    selectoptions={repetitionIndex}
                    defaultValue={surveyUnit.address?.repetitionIndex}
                    label="Indice de répétition"
                    error={errors.address?.repetitionIndex?.message}
                    {...register("address.repetitionIndex")}
                  />
                </Box>
              </Row>
              <Field
                type="select"
                label="Type de voie"
                selectoptions={streetType}
                defaultValue={surveyUnit.address?.streetType}
                error={errors.address?.streetType?.message}
                {...register("address.streetType")}
              />
              <Field
                label="Libellé de voie"
                error={errors.address?.streetName?.message}
                {...register("address.streetName")}
              />
              <Field
                label="Complément (ZI, Bat, Res ...)"
                error={errors.address?.addressSupplement?.message}
                {...register("address.addressSupplement")}
              />
              <Field
                label="Mention spéciale (BP, TSA ...)"
                error={errors.address?.specialDistribution?.message}
                {...register("address.specialDistribution")}
              />
            </Stack>
            <Stack gap={4} pt={1}>
              <Field
                sx={{ width: "210px" }}
                label="Commune"
                error={errors.address?.cityName?.message}
                {...register("address.cityName")}
              />
              <Field
                sx={{ width: "120px" }}
                label="Code postal"
                error={errors.address?.zipCode?.message}
                {...register("address.zipCode")}
              />
              <Field
                sx={{ width: "210px" }}
                label="Bureau distributeur"
                error={errors.address?.deliveryOffice?.message}
                {...register("address.deliveryOffice")}
              />
              <Field
                sx={{ width: "210px" }}
                label="Code cedex"
                error={errors.address?.cedexCode?.message}
                {...register("address.cedexCode")}
              />
              <Box sx={{ width: "300px" }}>
                <Field
                  defaultValue={
                    surveyUnit.address?.countryName ? surveyUnit.address.countryName : "France"
                  }
                  type="select"
                  label="Sélectionnez un pays"
                  selectoptions={countries}
                  error={errors.address?.countryName?.message}
                  {...register("address.countryName")}
                />
              </Box>
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
