import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { UseFormRegister, UseFormReturn } from "react-hook-form";
import { Schema, z } from "zod";
import { FormContent } from "../ContactFormDialog";

type Props = {
  errors: any;
  register: UseFormRegister<z.TypeOf<Schema>>;
  control?: UseFormReturn<any, any, any>["control"];
};

export const InformationsForm = ({ errors, register, control }: Props) => {
  return (
    <Stack>
      <Typography sx={{ pb: 3 }} variant="titleMedium" fontSize={18}>
        Informations du contact
      </Typography>
      <FormContent errors={errors} register={register} control={control} />
    </Stack>
  );
};
