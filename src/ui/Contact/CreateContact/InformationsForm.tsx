import { Box, Button, Divider, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ContactInformationForm, schema, styles } from "../ContactFormDialog";
import { useForm } from "../../../hooks/useForm";
import { Row } from "../../Row";

import { APISchemas } from "../../../types/api";
import { AddressFormFields } from "../../Form/AddressFormFields";

type Props = {
  handleSubmitStep: (data: any) => void;
  handleBack: () => void;
  contact?: Omit<APISchemas["ContactFirstLoginDto"], "identifier">;
};

export const InformationsForm = ({ handleSubmitStep, handleBack, contact }: Props) => {
  const defaultValues =
    contact?.address?.countryName && contact.address.countryName !== ""
      ? contact
      : { ...contact, address: { ...contact?.address, countryName: "FRANCE" } };

  const { register, control, errors, handleSubmit } = useForm(schema, {
    defaultValues: defaultValues,
  });

  const onSubmit = handleSubmit(data => {
    handleSubmitStep(data);
  });

  return (
    <Stack>
      <Typography sx={{ pb: 3 }} variant="titleMedium" fontSize={18}>
        Informations du contact
      </Typography>
      <form action="#" onSubmit={onSubmit}>
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

        <Row p={4} justifyContent={"flex-end"}>
          <Button disabled={true} variant={"outlined"} onClick={handleBack} sx={{ mr: 1 }}>
            Annuler
          </Button>

          <Button variant="contained" type="submit">
            Suivant
          </Button>
        </Row>
      </form>
    </Stack>
  );
};
