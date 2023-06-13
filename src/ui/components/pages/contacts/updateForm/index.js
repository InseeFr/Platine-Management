import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";
import { useAPI } from "core/hooks";
import { FormInput } from "ui/shared/form/formInput";

const defaultValues = {
  lastName: "",
  firstName: "",
  civility: "",
  email: "",
  phone: "",
  comment: "",
  function: "",
  address: {
    streetNumber: "",
    streetName: "",
    city: "",
    zipCode: "",
    countryName: "",
  },
};

export const ContactsUpdateForm = ({ idec }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [contactHasBeenUpdated, setcontactHasBeenUpdated] = useState(false);
  const { getContactById, updateContact } = useAPI();

  useEffect(() => {
    (async () => {
      const { data } = await getContactById(idec);
      setFormValues(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idec]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleChangeAddress = e => {
    const { name, value } = e.target;
    const { address } = formValues;
    setFormValues({
      ...formValues,
      address: { ...address, [name]: value },
    });
  };

  const handleUpdateContact = async () => {
    const { ...contactInfos } = formValues;

    const { error } = await updateContact(idec, contactInfos);
    if (!error) {
      setcontactHasBeenUpdated(true);
    }
  };

  const resetForm = () => {
    setFormValues(defaultValues);
  };

  return (
    <>
      {contactHasBeenUpdated && <div>Contact mis à jour</div>}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4">Coordonnées </Typography>

        <Grid container spacing={2}>
          <FormInput readOnly label="Idec" name="identifier" value={idec} handleChange={handleChange} />

          <FormInput
            label="Civilité"
            name="civility"
            value={formValues.civility}
            handleChange={handleChange}
          />
          <FormInput
            readOnly
            label="Nom"
            name="lastName"
            value={formValues.lastName}
            handleChange={handleChange}
          />
          <FormInput
            readOnly
            label="Prenom"
            name="firstName"
            value={formValues.firstName}
            handleChange={handleChange}
          />
          <FormInput
            readOnly
            label="Fonction"
            name="function"
            value={formValues.function}
            handleChange={handleChange}
          />
          <FormInput
            readOnly
            label="Mail"
            name="email"
            value={formValues.email}
            handleChange={handleChange}
          />
          <FormInput
            readOnly
            label="Téléphone"
            name="phone"
            value={formValues.phone}
            handleChange={handleChange}
          />
        </Grid>
        <Grid container spacing={2}>
          <FormInput
            readOnly
            label="Numéro de rue"
            name="streetNumber"
            value={formValues.address.streetNumber}
            handleChange={handleChangeAddress}
          />
          <FormInput
            readOnly
            label="Libellé de rue"
            name="streetName"
            value={formValues.address.streetName}
            handleChange={handleChangeAddress}
          />
          <FormInput
            readOnly
            label="Code postal"
            name="zipCode"
            value={formValues.address.zipCode}
            handleChange={handleChangeAddress}
          />
          <FormInput
            readOnly
            label="Ville"
            name="city"
            value={formValues.address.city}
            handleChange={handleChangeAddress}
          />
          <FormInput
            readOnly
            label="Pays"
            name="countryName"
            value={formValues.address.countryName}
            handleChange={handleChangeAddress}
          />
        </Grid>
      </Box>
      <Button variant="outlined" color="primary" type="submit" onClick={handleUpdateContact}>
        Valider
      </Button>
      <Button variant="outlined" color="secondary" type="submit" onClick={resetForm}>
        Annuler
      </Button>
    </>
  );
};
