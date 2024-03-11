import { FormGroup, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Field } from "../../Form/Field";
import { UseFormRegister, UseFormReturn } from "react-hook-form";
import { Schema, z } from "zod";

type Props = {
  errors: any;
  register: UseFormRegister<z.TypeOf<Schema>>;
  control?: UseFormReturn<any, any, any>["control"];
};

const civilities = [
  { label: "Madame", value: "Female" },
  { label: "Monsieur", value: "Male" },
];

export const InformationsForm = ({ errors, register, control }: Props) => {
  return (
    <Stack>
      <Typography sx={{ mt: 2, mb: 1 }}>Informations du contact</Typography>
      <FormGroup>
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
        <Field
          sx={{ width: "150px" }}
          label="Téléphone 1"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </FormGroup>
    </Stack>
  );
};
