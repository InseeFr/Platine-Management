import Dialog from "@mui/material/Dialog";
import { useForm } from "../../../hooks/useForm";
import { APISchemas } from "../../../types/api";
import {
  ContactInformationForm,
  repetitionIndexEnum,
  schema,
  streetTypeEnum,
  styles,
} from "../ContactFormDialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { UseFormRegister, UseFormReturn } from "react-hook-form";
import { Schema, z } from "zod";
import { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Field } from "../../Form/Field";
import { countries } from "../../../constants/countries";
import Stack from "@mui/material/Stack";
import { Row } from "../../Row";

type Props = {
  open: boolean;
  onClose: () => void;
  surveyUnit?: APISchemas["SurveyUnitDto"];
};

export const CreateContactDialog = ({ open, onClose, surveyUnit }: Props) => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    function: "",
    phone: "",
    address: { countryName: "FRANCE" },
  };

  const { register, control, errors, reset, handleSubmit, setValue } = useForm(schema, {
    defaultValues: defaultValues,
  });

  const onAddressChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("usualCompanyName", surveyUnit?.identificationName);
    setValue("address", {
      cedexCode: "",
      cedexName: "",
      cityName: "",
      zipCode: "",
      streetName: "",
      ...surveyUnit?.address,
    });
  };

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = handleSubmit(data => {
    console.log(data);
    handleClose();
  });

  return (
    <Dialog open={open} onClose={handleClose} sx={{ ".MuiPaper-root": { maxWidth: "1160px", px: 3 } }}>
      <form action="#" onSubmit={onSubmit}>
        <DialogTitle>Informations du contact</DialogTitle>
        <DialogContent>
          <FormContent
            errors={errors}
            register={register}
            control={control}
            contact={defaultValues}
            surveyUnitId={surveyUnit?.idSu}
            onAddressChecked={onAddressChecked}
          />
        </DialogContent>
        <DialogActions>
          <Button type="reset" onClick={handleClose}>
            Annuler
          </Button>
          <Button type="submit" variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

type FormContentProps = {
  errors: any;
  register: UseFormRegister<z.TypeOf<Schema>>;
  control: UseFormReturn<any, any, any>["control"];
  contact?: Omit<APISchemas["ContactFirstLoginDto"], "identifier">;
  surveyUnitId?: string;
  onAddressChecked?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormContent = ({
  errors,
  register,
  control,
  contact,
  surveyUnitId,
  onAddressChecked,
}: FormContentProps) => {
  const [country, setCountry] = useState(contact?.address?.countryName ?? "FRANCE");
  return (
    <Box sx={styles.Grid}>
      <ContactInformationForm errors={errors} register={register} control={control} />
      <Divider orientation="vertical" variant="middle" />
      <Box component={"div"} pt={surveyUnitId === undefined ? 0 : 1.5}>
        {surveyUnitId !== undefined && (
          <FormControlLabel
            sx={{ pb: 2, ".MuiFormControlLabel-label": { typography: "titleSmall" } }}
            control={<Checkbox size="small" onChange={onAddressChecked} />}
            label="L’adresse du contact est identique à l’adresse de l’unité enquêtée"
          />
        )}
        <Box sx={styles.Grid}>
          <Stack gap={3} pt={1}>
            <Box sx={{ width: "610px" }}>
              <Field
                defaultValue={country}
                type="select"
                label="Sélectionnez un pays"
                selectoptions={countries}
                error={errors.address?.countryName?.message}
                control={control}
                name={"address.countryName"}
                onChange={e => {
                  setCountry(e.target.value as string);
                }}
              />
            </Box>

            <Field
              sx={{ width: "650px" }}
              label="Raison sociale"
              error={errors.usualCompanyName?.message}
              control={control}
              name="usualCompanyName"
            />

            <Field
              sx={{ width: "650px" }}
              label="Complément (ZI, Bat, Res ...)"
              error={errors.address?.addressSupplement?.message}
              control={control}
              name={"address.addressSupplement"}
            />
            <Row gap={2}>
              <Field
                sx={{ width: "100px" }}
                label="N° de voie"
                error={errors.address?.streetNumber?.message}
                control={control}
                name={"address.streetNumber"}
              />
              <Box sx={{ width: "250px" }}>
                {country === "FRANCE" ? (
                  <Field
                    type="select"
                    selectoptions={repetitionIndexEnum}
                    defaultValue={contact?.address?.repetitionIndex ?? ""}
                    label="Indice de répétition"
                    error={errors.address?.repetitionIndex?.message}
                    control={control}
                    name={"address.repetitionIndex"}
                  />
                ) : (
                  <Field
                    label="Indice de répétition"
                    defaultValue={contact?.address?.repetitionIndex ?? ""}
                    error={errors.address?.repetitionIndex?.message}
                    control={control}
                    name={"address.repetitionIndex"}
                  />
                )}
              </Box>
              <Box sx={{ width: "270px" }}>
                {country === "FRANCE" ? (
                  <Field
                    sx={{ width: "270px" }}
                    type="select"
                    label="Type de voie"
                    selectoptions={streetTypeEnum}
                    defaultValue={contact?.address?.streetType ?? ""}
                    error={errors.address?.streetType?.message}
                    control={control}
                    name={"address.streetType"}
                  />
                ) : (
                  <Field
                    sx={{ width: "270px" }}
                    label="Type de voie"
                    defaultValue={contact?.address?.streetType ?? ""}
                    error={errors.address?.streetType?.message}
                    control={control}
                    name={"address.streetType"}
                  />
                )}
              </Box>
            </Row>
            <Field
              sx={{ width: "650px" }}
              label="Libellé de voie"
              error={errors.address?.streetName?.message}
              control={control}
              name={"address.streetName"}
            />
            <Field
              sx={{ width: "650px" }}
              label="Mention spéciale (BP, TSA ...)"
              error={errors.address?.specialDistribution?.message}
              control={control}
              name={"address.specialDistribution"}
            />
            <Row gap={2} alignItems={"flex-start"}>
              <Field
                sx={{ width: "180px" }}
                label="Commune"
                error={errors.address?.cityName?.message}
                control={control}
                name={"address.cityName"}
              />
              <Field
                sx={{ width: "120px" }}
                label="Code postal"
                error={errors.address?.zipCode?.message}
                control={control}
                name={"address.zipCode"}
              />

              <Field
                sx={{ width: "180px" }}
                label="Bureau distributeur"
                error={errors.address?.cedexName?.message}
                control={control}
                name={"address.cedexName"}
              />
              <Field
                sx={{ width: "120px" }}
                label="Code cedex"
                error={errors.address?.cedexCode?.message}
                control={control}
                name={"address.cedexCode"}
              />
            </Row>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
