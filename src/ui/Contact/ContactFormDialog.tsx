import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useForm } from "../../hooks/useForm.ts";
import { APISchemas } from "../../types/api.ts";
import { Field } from "../Form/Field.tsx";
import Stack from "@mui/material/Stack";
import { useFetchMutation } from "../../hooks/useFetchQuery.ts";
import { AddressFormFields } from "../Form/AddressFormFields.tsx";
import { useState } from "react";
import { contactSchema } from "../../schemas/contactSchema.ts";

type Props = {
  open: boolean;
  onClose: () => void;
  contact: APISchemas["ContactDetailsDto"];
  onSave: () => void;
};

const civilities = [
  { label: "Madame", value: "Female" },
  { label: "Monsieur", value: "Male" },
];

export const repetitionIndexEnum = ["BIS", "TER", "QUATER", "QUINQUIES", "A", "B", "C", "D"];

export const streetTypeEnum = ["rue", "avenue"]; // TODO: use real street type

export const styles = {
  Grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr ",
    gap: "24px",
    paddingTop: "8px",
  },
};

export const ContactFormDialog = ({ open, onClose, contact, onSave }: Props) => {
  const code = contact.address?.zipCode && contact.address.zipCode !== "" ? "zipCode" : "cedexCode";

  const defaultValues = { ...contact, address: { ...contact.address, codeChoice: code } };
  const { register, control, errors, handleSubmit, reset, setValue } = useForm(contactSchema, {
    defaultValues: defaultValues,
  });

  const [codeType, setCodeType] = useState(code);

  const { mutateAsync, isPending } = useFetchMutation("/api/contacts/{id}", "put");

  const onSubmit = handleSubmit(async data => {
    if (codeType === "zipCode") {
      await mutateAsync({
        body: {
          ...data,
          identifier: contact.identifier,
          address: { ...data.address, cedexCode: "", cedexName: "" },
        },
        urlParams: { id: contact.identifier },
      });
      setValue("address.cedexCode", "");
      setValue("address.cedexName", "");
    }
    if (codeType === "cedexCode") {
      await mutateAsync({
        body: {
          ...data,
          identifier: contact.identifier,
          address: { ...data.address, zipCode: "", cityName: "" },
        },
        urlParams: { id: contact.identifier },
      });
      setValue("address.zipCode", "");
      setValue("address.cityName", "");
    }

    onSave();
  });

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ ".MuiPaper-root": { maxWidth: "80vw", p: 2 } }}>
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle sx={{ typography: "headlineMedium" }}>{`Modifier les coordonnées ${
          (contact.firstName || contact.lastName) && `de ${contact.firstName} ${contact.lastName}`
        }`}</DialogTitle>
        <DialogContent>
          <Box sx={styles.Grid}>
            <Stack gap={2}>
              <Typography variant="headlineSmall" sx={{ pb: 1 }}>
                Informations du contact
              </Typography>
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
              <Field label="Adresse mail" error={errors.email?.message} {...register("email")} />
              <Field label="Téléphone 1" error={errors.phone?.message} {...register("phone")} />
              <Field
                label="Téléphone 2"
                error={errors.otherPhone?.message}
                {...register("otherPhone")}
              />
            </Stack>
            <Divider orientation="vertical" variant="middle" />
            <AddressFormFields
              errors={errors}
              register={register}
              repetitionIndexValue={contact.address?.repetitionIndex}
              streetTypeValue={contact.address?.streetType}
              countryValue={contact.address?.countryName?.toLocaleUpperCase()}
              codeType={code}
              onChangeCodeChoice={e => {
                setCodeType(e.target.value);
                setValue("address.codeChoice", e.target.value);
              }}
              type="contact"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ gap: 2 }}>
          <Button type="reset" variant="outlined" onClick={handleClose} disabled={isPending}>
            Annuler
          </Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
