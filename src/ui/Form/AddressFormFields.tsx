import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Field } from "./Field.tsx";
import { Row } from "../Row.tsx";
import { countries } from "../../constants/countries.ts";
import { repetitionIndexEnum } from "../Contact/ContactFormDialog.tsx";
import { Control, UseFormRegister } from "react-hook-form";
import { Schema, z } from "zod";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Radio } from "@mui/material";
import { streetTypes } from "../../constants/streetTypes.ts";

type Props = {
  errors: any;
  register: UseFormRegister<z.TypeOf<Schema>>;
  repetitionIndexValue?: string;
  streetTypeValue?: string;
  countryValue?: string;
  codeType: string;
  onChangeCodeChoice: (event: React.ChangeEvent<HTMLInputElement>) => void;
  control: Control<any, any, any>;
  onResetField: (name: any) => void;
  type?: "contact" | "surveyUnit";
};

export const AddressFormFields = ({
  errors,
  register,
  repetitionIndexValue,
  streetTypeValue,
  countryValue,
  codeType,
  onChangeCodeChoice,
  control,
  onResetField,
  type = "surveyUnit",
}: Props) => {
  const [country, setCountry] = useState(countryValue);
  const [codeChoice, setCodeChoice] = useState(codeType);

  return (
    <Stack gap={2}>
      <Typography variant="headlineSmall" sx={{ pb: 1 }}>
        Adresse du contact
      </Typography>
      <Field
        defaultValue={countryValue}
        type="select"
        label="Pays"
        selectoptions={countries}
        error={errors.address?.countryName?.message}
        {...register("address.countryName")}
        onChange={e => {
          setCountry(e.target.value as string);
        }}
      />
      {type === "surveyUnit" && (
        <Field
          label="Raison sociale"
          error={errors.identificationName?.message}
          {...register("identificationName")}
          onResetField={() => onResetField("identificationName")}
          type="text"
          control={control}
        />
      )}
      <Row gap={2} justifyContent={"space-between"}>
        <Field
          sx={{ width: "7vw" }}
          label="N°"
          error={errors.address?.streetNumber?.message}
          {...register("address.streetNumber")}
          onResetField={() => onResetField("address.streetNumber")}
          type="text"
          control={control}
        />
        <Box sx={{ width: "10vw" }}>
          {!country || country === "FRANCE" ? (
            <Field
              type="select"
              control={control}
              selectoptions={repetitionIndexEnum}
              defaultValue={repetitionIndexValue}
              label="Indice"
              error={errors.address?.repetitionIndex?.message}
              {...register("address.repetitionIndex")}
              onResetField={() => onResetField("address.repetitionIndex")}
            />
          ) : (
            <Field
              type="text"
              control={control}
              label="Indice"
              defaultValue={repetitionIndexValue ?? ""}
              error={errors.address?.repetitionIndex?.message}
              {...register("address.repetitionIndex")}
              onResetField={() => onResetField("address.repetitionIndex")}
            />
          )}
        </Box>
        <Box sx={{ width: "18vw" }}>
          {!country || country === "FRANCE" ? (
            <Field
              type="select"
              control={control}
              label="Type de voie"
              selectoptions={streetTypes}
              defaultValue={streetTypeValue}
              error={errors.address?.streetType?.message}
              {...register("address.streetType")}
              onResetField={() => onResetField("address.streetType")}
            />
          ) : (
            <Field
              type="text"
              control={control}
              label="Type de voie"
              defaultValue={streetTypeValue ?? ""}
              error={errors.address?.streetType?.message}
              {...register("address.streetType")}
              onResetField={() => onResetField("address.streetType")}
            />
          )}
        </Box>
      </Row>
      <Field
        type="text"
        control={control}
        label="Nom de la voie"
        error={errors.address?.streetName?.message}
        {...register("address.streetName")}
        onResetField={() => onResetField("address.streetName")}
      />
      <Field
        type="text"
        control={control}
        label="Mention spéciale"
        error={errors.address?.specialDistribution?.message}
        {...register("address.specialDistribution")}
        onResetField={() => onResetField("address.specialDistribution")}
      />
      <Field
        type="text"
        control={control}
        label="Complément"
        error={errors.address?.addressSupplement?.message}
        {...register("address.addressSupplement")}
        onResetField={() => onResetField("address.addressSupplement")}
      />
      <FormControl>
        <FormLabel
          sx={{
            typography: "titleSmall",
            color: "black.main",
            "&.Mui-focused": { color: "black.main" },
          }}
          id="code-choice"
        >
          Sélectionner s’il s’agit d’un code cedex ou postal (*)
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="radio-buttons-group-code-choice"
          name="codeChoice"
          value={codeChoice}
          onChange={e => {
            setCodeChoice(e.target.value);
            onChangeCodeChoice(e);
          }}
          sx={{
            flexWrap: "nowrap",
            ".MuiFormControlLabel-label": {
              typography: "bodyMedium",
            },
          }}
        >
          <FormControlLabel
            value="cedexCode"
            control={<Radio sx={{ color: "primary.main" }} />}
            label="Code Cedex"
          />
          <FormControlLabel
            value="zipCode"
            control={<Radio sx={{ color: "primary.main" }} />}
            label="Code postal"
          />
        </RadioGroup>
      </FormControl>
      {codeChoice === "zipCode" && (
        <>
          <Field
            control={control}
            label="Code postal *"
            error={errors.address?.zipCode?.message}
            type="number"
            {...register("address.zipCode")}
            onResetField={() => onResetField("address.zipCode")}
          />
          <Field
            type="text"
            control={control}
            label="Commune *"
            error={errors.address?.cityName?.message}
            {...register("address.cityName")}
            onResetField={() => onResetField("address.cityName")}
          />
        </>
      )}
      {codeChoice === "cedexCode" && (
        <>
          <Field
            control={control}
            label="Code cedex *"
            error={errors.address?.cedexCode?.message}
            type="number"
            {...register("address.cedexCode")}
            onResetField={() => onResetField("address.cedexCode")}
          />
          <Field
            type="text"
            control={control}
            label="Libellé Cedex * (exemple : Paris CEDEX 14) "
            error={errors.address?.cedexName?.message}
            {...register("address.cedexName")}
            onResetField={() => onResetField("address.cedexName")}
          />
        </>
      )}
    </Stack>
  );
};
