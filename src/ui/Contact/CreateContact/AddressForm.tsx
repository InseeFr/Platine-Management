import { Box, Checkbox, FormControlLabel } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { UseFormRegister } from "react-hook-form";
import { Schema, z } from "zod";
import { Field } from "../../Form/Field";
import { repetitionIndexEnum, streetTypeEnum, styles } from "../ContactFormDialog";
import { countries } from "../../../constants/countries";
import { Row } from "../../Row";

type Props = {
  errors: any;
  register: UseFormRegister<z.TypeOf<Schema>>;
};

export const AddressForm = ({ errors, register }: Props) => {
  const onCheck = () => {};
  return (
    <Stack>
      <Typography sx={{ mt: 2, mb: 1 }}>Adresse du contact</Typography>

      <FormControlLabel
        control={<Checkbox defaultChecked={false} />}
        onChange={onCheck}
        label="L’adresse du contact est identique à l’adresse de l’unité enquêtée"
      />
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
                selectoptions={repetitionIndexEnum}
                defaultValue={""}
                label="Indice de répétition"
                error={errors.address?.repetitionIndex?.message}
                {...register("address.repetitionIndex")}
              />
            </Box>
          </Row>
          <Field
            type="select"
            label="Type de voie"
            selectoptions={streetTypeEnum}
            defaultValue={""}
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
              defaultValue={"FRANCE"}
              type="select"
              label="Sélectionnez un pays"
              selectoptions={countries}
              error={errors.address?.countryName?.message}
              {...register("address.countryName")}
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};
