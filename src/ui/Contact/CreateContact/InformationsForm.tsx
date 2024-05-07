import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { schema } from "../ContactFormDialog";
import { useForm } from "../../../hooks/useForm";
import { Row } from "../../Row";

import { APISchemas } from "../../../types/api";
import { FormContent } from "./CreateContactDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  handleSubmitStep: (data: any) => void;
  contact?: Omit<APISchemas["ContactFirstLoginDto"], "identifier">;
  surveyUnit?: APISchemas["SurveyUnitDto"];
};

export const InformationsForm = ({ handleSubmitStep, contact, surveyUnit }: Props) => {
  const navigate = useNavigate();
  const defaultValues =
    contact?.address?.countryName && contact.address.countryName !== ""
      ? contact
      : { ...contact, address: { ...contact?.address, countryName: "FRANCE" } };

  const { register, control, errors, handleSubmit, setValue } = useForm(schema, {
    defaultValues: defaultValues,
  });

  const onSubmit = handleSubmit(data => {
    handleSubmitStep(data);
  });

  const [country, setCountry] = useState(defaultValues?.address?.countryName ?? "FRANCE");

  const onAddressChecked = () => {
    setValue("usualCompanyName", surveyUnit?.identificationName);
    setValue("address", {
      cedexCode: "",
      cedexName: "",
      cityName: "",
      zipCode: "",
      streetName: "",
      ...surveyUnit?.address,
    });

    setCountry(surveyUnit?.address?.countryName ?? "FRANCE");
  };

  const onChangeCountry = (value: string) => {
    setCountry(value);
    setValue("address.countryName", value);
  };

  return (
    <Stack>
      <Typography sx={{ pb: 3 }} variant="titleMedium" fontSize={18}>
        Informations du contact
      </Typography>
      <form action="#" onSubmit={onSubmit}>
        <FormContent
          errors={errors}
          register={register}
          control={control}
          contact={defaultValues}
          country={country}
          onChangeCountry={onChangeCountry}
          surveyUnitId={surveyUnit?.idSu}
          onAddressChecked={onAddressChecked}
        />

        <Row p={4} justifyContent={"flex-end"}>
          <Button variant={"outlined"} onClick={() => navigate(-1)} sx={{ mr: 1 }}>
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
