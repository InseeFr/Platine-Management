import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button, Typography } from "@mui/material";
import { yearItems, periodItems } from "core/mock/select-items";
import { useAPI } from "core/hooks";
import { buttonDictionary, contactDictionary } from "i18n";

const defaultValues = {
  identifier: "",
  lastName: "",
  firstName: "",
  email: "",
  idSu: "",
  identificationName: "",
  identificationCode: "",
  source: "",
  year: "",
  period: "",
};

export const ContactsSearchForm = ({ handleOnClickSearchButton, handleOnClickCancelButton }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [sources, setSources] = useState([]);
  const { getSources } = useAPI();

  useEffect(() => {
    (async () => {
      const { data, error } = await getSources();
      if (!error && data) {
        setSources(data.content);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const resetForm = () => {
    setFormValues(defaultValues);
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl variant="standard" sx={{ width: 100 }}>
          <InputLabel htmlFor="component-simple">Idec</InputLabel>
          <Input
            id="component-simple"
            name="identifier"
            value={formValues.identifier}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: 200 }}>
          <InputLabel htmlFor="component-simple">{contactDictionary.personalDataLastname}</InputLabel>
          <Input
            id="component-simple"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: 200 }}>
          <InputLabel htmlFor="component-simple">{contactDictionary.personalDataFirstname}</InputLabel>
          <Input
            id="component-simple"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: 300 }}>
          <InputLabel htmlFor="component-simple">{contactDictionary.email}</InputLabel>
          <Input id="component-simple" name="email" value={formValues.email} onChange={handleChange} />
        </FormControl>
        <Typography></Typography>
        <FormControl variant="standard" sx={{ width: 200 }}>
          <InputLabel htmlFor="component-simple">{contactDictionary.surveyUnitIdentifier}</InputLabel>
          <Input id="component-simple" name="idSu" value={formValues.idSu} onChange={handleChange} />
        </FormControl>
        <FormControl variant="standard" sx={{ width: 200 }}>
          <InputLabel htmlFor="component-simple">
            {contactDictionary.surveyUnitIdentificationCode}
          </InputLabel>
          <Input
            id="component-simple"
            name="identificationCode"
            value={formValues.identificationCode}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: 300 }}>
          <InputLabel htmlFor="component-simple">
            {contactDictionary.surveyUnitIdentificationName}
          </InputLabel>
          <Input
            id="component-simple"
            name="identificationName"
            value={formValues.identificationName}
            onChange={handleChange}
          />
        </FormControl>
        <Typography></Typography>
        <FormControl>
          <FormControl variant="standard" style={{ minWidth: 120 }}>
            <InputLabel htmlFor="component-simple">{contactDictionary.source}</InputLabel>
            <Select name="source" value={formValues.source} onChange={handleChange}>
              <MenuItem key="default" value="">
                {contactDictionary.noSourceSelected}
              </MenuItem>
              {sources.map(item => (
                <MenuItem key={item.idSource} value={item.idSource}>
                  {item.shortWording}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormControl>
        <FormControl>
          <FormControl variant="standard" style={{ minWidth: 120 }}>
            <InputLabel htmlFor="component-simple">{contactDictionary.period}</InputLabel>
            <Select name="period" value={formValues.period} onChange={handleChange}>
              {periodItems.map(item => (
                <MenuItem key={item.key} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormControl>
        <FormControl>
          <FormControl variant="standard" style={{ minWidth: 120 }}>
            <InputLabel htmlFor="component-simple">{contactDictionary.year}</InputLabel>
            <Select name="year" value={formValues.year} onChange={handleChange}>
              {yearItems.map(item => (
                <MenuItem key={item.key} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormControl>
      </Box>
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        onClick={() => handleOnClickSearchButton(formValues)}
      >
        {buttonDictionary.search}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        onClick={() => {
          resetForm();
          handleOnClickCancelButton();
        }}
      >
        {buttonDictionary.cancel}
      </Button>
      <Button variant="outlined" color="primary" type="submit">
        {contactDictionary.createContact}
      </Button>
    </>
  );
};
