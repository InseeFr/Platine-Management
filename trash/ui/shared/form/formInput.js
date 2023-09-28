import { FormControl, Grid, Input, InputLabel } from "@mui/material";

export const FormInput = ({ value, label, handleChange, name, readOnly = false }) => {
  const optionalInputProps = readOnly
    ? {
        readOnly: true,
      }
    : {};
  const expectedId = readOnly ? "filled-read-only-input" : "component-simple";

  return (
    <Grid item>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple"> {label}</InputLabel>
        <Input
          id={expectedId}
          name={name}
          value={value}
          onChange={handleChange}
          InputProps={optionalInputProps}
        />
      </FormControl>
    </Grid>
  );
};
