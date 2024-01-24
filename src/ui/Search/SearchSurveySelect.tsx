import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { useId } from "react";

type Props = { options: string[]; label: string } & SelectProps;

export const SearchSurveySelect = ({ label, options, ...props }: Props) => {
  const id = useId();
  return (
    <FormControl fullWidth>
      <InputLabel size="small" id={`${id}-label`}>
        Age
      </InputLabel>
      <Select size="small" labelId={`${id}-label`} id={id} label="Age" {...props}>
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
