import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { z } from "zod";
import { useForm } from "../../../hooks/useForm.ts";
import { APISchemas } from "../../../types/api.ts";
import { Field } from "../../Form/Field.tsx";
import Stack from "@mui/material/Stack";
import { Row } from "../../Row.tsx";
import StarIcon from "@mui/icons-material/Star";
import { style } from "../../Search/SearchPanel.tsx";

type Props = {
  open: boolean;
  handleClose: () => void;
  contact: APISchemas["ContactFirstLoginDto"];
};

const schema = z.object({
  civility: z.enum(["Female", "Male", "Undefined"]),
  lastName: z.string().min(3),
  firstName: z.string().min(3),
  function: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(10).max(14).optional().or(z.literal("")),
  secondPhone: z.string().min(10).max(14).optional().or(z.literal("")),
  socialReason: z.string().optional(), //TODO: add in api
  address: z
    .object({
      streetNumber: z.string().optional(),
      repetitionIndex: z.enum(["bis"]).optional().or(z.literal("")), //TODO: use real repetition index
      streetType: z.enum(["rue", "avenue"]).optional(), // TODO: use real street type
      streetName: z.string().optional(),
      addressSupplement: z.string().optional(),
      specialDistribution: z.string().optional(),
      cityName: z.string().optional(),
      zipCode: z.string().optional(),
      deliveryOffice: z.string().optional(), // TODO: add in api
      cedexCode: z.string().optional(),
      countryName: z.string().optional().or(z.literal("")),
    })
    .optional(),
});

const civilities = [
  { label: "Madame", value: "Female" },
  { label: "Monsieur", value: "Male" },
];

const repetitionIndex = ["bis"]; //TODO: use real repetition index

const streetType = ["rue", "avenue"]; // TODO: use real street type

const countries = ["France", "Belgique"]; // TODO: use real countries

export const ContactDetailsDialog = ({ open, handleClose, contact }: Props) => {
  const defaultValues = contact.address?.countryName
    ? contact
    : { ...contact, address: { ...contact.address, countryName: "France" } };
  const { register, control, errors, handleSubmit } = useForm(schema, {
    defaultValues: defaultValues,
  });

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  return (
    <Dialog open={open} onClose={handleClose} sx={{ ".MuiPaper-root": { maxWidth: "1160px", px: 3 } }}>
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle>Modification des coordonnées</DialogTitle>
        <DialogContent sx={{ ".MuiDialogContent-root": { mt: 2 } }}>
          <Row spacing={5} alignItems={"flex-start"} flexWrap={"wrap"} sx={style.root}>
            <Row gap={4}>
              <Stack gap={4}>
                <Field
                  control={control}
                  label="Civilité"
                  name="civility"
                  type="radios"
                  options={civilities}
                />
                <Field label="Nom" error={errors.lastName?.message} {...register("lastName")} />
                <Field label="Prénom" error={errors.firstName?.message} {...register("firstName")} />
                <Field label="Fonction" error={errors.function?.message} {...register("function")} />
                <Field label="Adresse courriel" error={errors.email?.message} {...register("email")} />
                <Row gap={3}>
                  <Field
                    sx={{ width: "150px" }}
                    label="Téléphone 1"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                  <StarIcon fontSize="small" color="yellow" />
                </Row>
                <Row gap={3}>
                  <Field
                    sx={{ width: "150px" }}
                    label="Téléphone 2"
                    error={errors.secondPhone?.message}
                    {...register("secondPhone")}
                  />
                  <StarIcon fontSize="small" color="text.hint" />
                </Row>
              </Stack>
              <Divider orientation="vertical" variant="middle" sx={{ height: "470px" }} />
            </Row>
            <Stack gap={4} pt={9}>
              <Field
                label="Raison sociale"
                error={errors.socialReason?.message}
                {...register("socialReason")}
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
                    defaultValue={contact.address?.repetitionIndex}
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
                defaultValue={contact.address?.streetType}
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
            <Stack gap={4} pt={9}>
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
                  defaultValue={contact.address?.countryName ? contact.address.countryName : "France"}
                  type="select"
                  label="Sélectionnez un pays"
                  selectoptions={countries}
                  error={errors.address?.countryName?.message}
                  {...register("address.countryName")}
                />
              </Box>
            </Stack>
          </Row>
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
