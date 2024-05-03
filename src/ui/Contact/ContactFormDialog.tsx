import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { Schema, z } from "zod";
import { useForm } from "../../hooks/useForm.ts";
import { APISchemas } from "../../types/api.ts";
import { Field } from "../Form/Field.tsx";
import Stack from "@mui/material/Stack";
import { Row } from "../Row.tsx";
import StarIcon from "@mui/icons-material/Star";
import { useFetchMutation } from "../../hooks/useFetchQuery.ts";
import { AddressFormFields } from "../Form/AddressFormFields.tsx";
import { UseFormRegister, UseFormReturn } from "react-hook-form";

type Props = {
  open: boolean;
  onClose: () => void;
  contact: APISchemas["ContactFirstLoginDto"];
  onSave: () => void;
};

export const addressSchema = z
  .object({
    streetNumber: z.string().optional(),
    repetitionIndex: z
      .string()
      .nullable()
      .transform(val => val ?? "")
      .optional(),
    streetType: z
      .string()
      .nullable()
      .transform(val => val ?? "")
      .optional(),
    streetName: z
      .string()
      .optional()
      .transform(val => val ?? ""),
    addressSupplement: z
      .string()
      .nullable()
      .transform(val => val ?? "")
      .optional(),
    specialDistribution: z
      .string()
      .nullable()
      .transform(val => val ?? "")
      .optional(),
    cedexName: z
      .string()
      .optional()
      .nullable()
      .transform(val => val ?? ""),
    cedexCode: z
      .string()
      .optional()
      .nullable()
      .transform(val => val ?? ""),
    cityName: z
      .string()
      .nullable()
      .transform(val => val ?? ""),
    zipCode: z
      .string()
      .nullable()
      .transform(val => val ?? ""),
    countryName: z.string().optional().or(z.literal("")),
  })
  .superRefine(({ cedexCode, zipCode, cityName, cedexName }, refinementContext) => {
    if ((cedexCode === undefined || cedexCode === "") && (zipCode === undefined || zipCode === "")) {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Code cedex ou code postal requis",
        path: ["zipCode"],
      });
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Code cedex ou code postal requis",
        path: ["cedexCode"],
      });
    }

    if (cedexCode && cedexCode !== "" && zipCode && zipCode !== "") {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Impossible de remplir code postal et code cedex",
        path: ["zipCode"],
      });
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Impossible de remplir code postal et code cedex",
        path: ["cedexCode"],
      });
    }

    if (cedexName && cedexName !== "" && cityName && cityName !== "") {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Impossible de remplir commune et bureau distributeur",
        path: ["cityName"],
      });
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Impossible de remplir commune et bureau distributeur",
        path: ["cedexName"],
      });
    }

    if (cedexCode !== undefined && cedexCode !== "" && (cedexName === undefined || cedexName === "")) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Champs requis",
        path: ["cedexName"],
      });
    }

    if (zipCode !== undefined && zipCode !== "" && (cityName === undefined || cityName === "")) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Champs requis",
        path: ["cityName"],
      });
    }
  });

export const schema = z.object({
  civility: z.enum(["Female", "Male", "Undefined"]),
  lastName: z.string().min(3),
  firstName: z.string().min(3),
  function: z.string().optional(),
  email: z.string().email(),
  phone: z
    .string()
    .nullable()
    .transform(val => val ?? "")
    .optional(),
  secondPhone: z.string().optional().or(z.literal("")),
  identificationName: z.string().optional(),
  usualCompanyName: z.string().optional(),
  address: addressSchema,
});

export const civilities = [
  { label: "Madame", value: "Female" },
  { label: "Monsieur", value: "Male" },
];

export const repetitionIndexEnum = ["bis"]; //TODO: use real repetition index

export const streetTypeEnum = ["rue", "avenue"]; // TODO: use real street type

export const styles = {
  Grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr ",
    gap: "40px",
  },
};

export const ContactFormDialog = ({ open, onClose, contact, onSave }: Props) => {
  const defaultValues = contact.address?.countryName
    ? contact
    : { ...contact, address: { ...contact.address, countryName: "FRANCE" } };
  const { register, control, errors, handleSubmit, reset } = useForm(schema, {
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

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };
  console.log({ errors });

  return (
    <Dialog open={open} onClose={handleClose} sx={{ ".MuiPaper-root": { maxWidth: "1160px", px: 3 } }}>
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle>Modification des coordonnées</DialogTitle>
        <DialogContent>
          <Box sx={styles.Grid}>
            <ContactInformationForm errors={errors} register={register} control={control} />
            <Divider orientation="vertical" variant="middle" />
            <Box component={"div"} pt={0}>
              <AddressFormFields
                type={"contact"}
                errors={errors}
                register={register}
                repetitionIndexValue={contact?.address?.repetitionIndex ?? ""}
                streetTypeValue={contact?.address?.streetType ?? ""}
                countryValue={contact?.address?.countryName ?? "FRANCE"}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="reset" onClick={handleClose} disabled={isPending}>
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

type ContactInformationFormProps = {
  errors: any;
  register: UseFormRegister<z.TypeOf<Schema>>;
  control: UseFormReturn<any, any, any>["control"];
};

export const ContactInformationForm = ({ errors, register, control }: ContactInformationFormProps) => {
  return (
    <Stack gap={3} pt={2.5}>
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
          sx={{ width: "180px" }}
          label="Téléphone 1"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <StarIcon fontSize="small" color="yellow" />
      </Row>
      <Row gap={3}>
        <Field
          sx={{ width: "180px" }}
          label="Téléphone 2"
          error={errors.secondPhone?.message}
          {...register("secondPhone")}
        />
        <StarIcon fontSize="small" color="text.hint" />
      </Row>
    </Stack>
  );
};
