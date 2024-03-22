import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Field } from "./Field";
import { Row } from "../Row";
import { countries } from "../../constants/countries";
import { repetitionIndexEnum, streetTypeEnum } from "../Contact/ContactFormDialog";
import { UseFormRegister } from "react-hook-form";
import { Schema, z } from "zod";
import { useState } from "react";

type Props = {
  errors: any;
  register: UseFormRegister<z.TypeOf<Schema>>;
  repetitionIndexValue?: string;
  streetTypeValue?: string;
  countryValue: string;
};

const styles = {
  Grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
  },
};

export const AddressFormFields = ({
  errors,
  register,
  repetitionIndexValue,
  streetTypeValue,
  countryValue,
}: Props) => {
  const [country, setCountry] = useState(countryValue);

  return (
    <Box sx={styles.Grid}>
      <Stack gap={3} pt={1}>
        <Box sx={{ width: "365px" }}>
          <Field
            defaultValue={countryValue ?? "FRANCE"}
            type="select"
            label="Sélectionnez un pays"
            selectoptions={countries}
            error={errors.address?.countryName?.message}
            {...register("address.countryName")}
            onChange={e => {
              setCountry(e.target.value as string);
            }}
          />
        </Box>
        <Field
          sx={{ width: "365px" }}
          label="Raison sociale"
          error={errors.identificationName?.message}
          {...register("identificationName")}
        />
        <Field
          sx={{ width: "365px" }}
          label="Complément (ZI, Bat, Res ...)"
          error={errors.address?.addressSupplement?.message}
          {...register("address.addressSupplement")}
        />
        <Row gap={2}>
          <Field
            sx={{ width: "100px" }}
            label="N° de voie"
            error={errors.address?.streetNumber?.message}
            {...register("address.streetNumber")}
          />
          <Box sx={{ width: "250px" }}>
            {country === "FRANCE" ? (
              <Field
                type="select"
                selectoptions={repetitionIndexEnum}
                defaultValue={repetitionIndexValue}
                label="Indice de répétition"
                error={errors.address?.repetitionIndex?.message}
                {...register("address.repetitionIndex")}
              />
            ) : (
              <Field
                label="Indice de répétition"
                defaultValue={repetitionIndexValue ?? ""}
                error={errors.address?.repetitionIndex?.message}
                {...register("address.repetitionIndex")}
              />
            )}
          </Box>
          {country === "FRANCE" ? (
            <Field
              sx={{ width: "200px" }}
              type="select"
              label="Type de voie"
              selectoptions={streetTypeEnum}
              defaultValue={streetTypeValue}
              error={errors.address?.streetType?.message}
              {...register("address.streetType")}
            />
          ) : (
            <Field
              sx={{ width: "200px" }}
              label="Type de voie"
              defaultValue={streetTypeValue ?? ""}
              error={errors.address?.streetType?.message}
              {...register("address.streetType")}
            />
          )}
        </Row>
        <Field
          sx={{ width: "365px" }}
          label="Libellé de voie"
          error={errors.address?.streetName?.message}
          {...register("address.streetName")}
        />
        <Field
          sx={{ width: "370px" }}
          label="Mention spéciale (BP, TSA ...)"
          error={errors.address?.specialDistribution?.message}
          {...register("address.specialDistribution")}
        />
        <Row gap={2} alignItems={"flex-start"}>
          <Field
            sx={{ width: "180px" }}
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
            sx={{ width: "180px" }}
            label="Bureau distributeur"
            error={errors.address?.cedexName?.message}
            {...register("address.cedexName")}
          />
          <Field
            sx={{ width: "120px" }}
            label="Code cedex"
            error={errors.address?.cedexCode?.message}
            {...register("address.cedexCode")}
          />
        </Row>
      </Stack>
    </Box>
  );
};
