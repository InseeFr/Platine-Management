import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { z } from "zod";
import { useForm } from "../../hooks/useForm.ts";
import { APISchemas } from "../../types/api.ts";
import { Field } from "../Form/Field.tsx";
import Stack from "@mui/material/Stack";
import { Row } from "../Row.tsx";
import StarIcon from "@mui/icons-material/Star";
import { useFetchMutation } from "../../hooks/useFetchQuery.ts";
import { AddressFormFields } from "../Form/AddressFormFields.tsx";

type Props = {
  open: boolean;
  onClose: () => void;
  contact: APISchemas["ContactFirstLoginDto"];
  onSave: () => void;
};

export const addressSchema = z
  .object({
    streetNumber: z.string().optional(),
    repetitionIndex: z.string().optional().nullable(), //TODO: use real repetition index
    streetType: z.string().optional().nullable(), // TODO: use real street type
    streetName: z.string().optional(),
    addressSupplement: z.string().optional().nullable(),
    specialDistribution: z.string().optional().nullable(),
    cityName: z.string().optional(),
    zipCode: z.string().optional(),
    deliveryOffice: z.string().optional(), // TODO: add in api
    cedexCode: z.string().optional().nullable(),
    countryName: z.string().optional().or(z.literal("")),
  })
  .optional();

const schema = z.object({
  civility: z.enum(["Female", "Male", "Undefined"]),
  lastName: z.string().min(3),
  firstName: z.string().min(3),
  function: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  secondPhone: z.string().optional().or(z.literal("")),
  identificationName: z.string().optional(),
  address: addressSchema,
});

const civilities = [
  { label: "Madame", value: "Female" },
  { label: "Monsieur", value: "Male" },
];

export const repetitionIndexEnum = ["bis"]; //TODO: use real repetition index

export const streetTypeEnum = ["rue", "avenue"]; // TODO: use real street type

export const styles = {
  Grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr 1fr",
    gap: "40px",
  },
};

export const ContactFormDialog = ({ open, onClose, contact, onSave }: Props) => {
  const defaultValues = contact.address?.countryName
    ? contact
    : { ...contact, address: { ...contact.address, countryName: "France" } };
  const { register, control, errors, handleSubmit } = useForm(schema, {
    defaultValues: defaultValues,
  });

  const { mutateAsync, isPending } = useFetchMutation("/api/contacts/{id}", "put");

  const onSubmit = handleSubmit(async data => {
    await mutateAsync({
      body: { ...data, identifier: contact.identifier },
      urlParams: { id: contact.identifier },
    });
    onSave();
  });

  console.log({ errors });

  return (
    <Dialog open={open} onClose={onClose} sx={{ ".MuiPaper-root": { maxWidth: "1160px", px: 3 } }}>
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle>Modification des coordonnées</DialogTitle>
        <DialogContent>
          <Box sx={styles.Grid}>
            <Stack gap={4}>
              <Field
                control={control}
                label="Civilité"
                name="civility"
                type="radios"
                error={errors?.civility?.message}
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
            <Divider orientation="vertical" variant="middle" />
            <Box component={"div"} pt={6}>
              <AddressFormFields
                errors={errors}
                register={register}
                repetitionIndexValue={contact.address?.repetitionIndex}
                streetTypeValue={contact.address?.streetType}
                countryValue={contact.address?.countryName}
              />
            </Box>
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
