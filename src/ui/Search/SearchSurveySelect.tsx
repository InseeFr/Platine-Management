import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { useId } from "react";

type Props = { options: string[] } & SelectProps;

export const SearchSurveySelect = ({ options, ...props }: Props) => {
  const id = useId();
  const labelId = `${id}-label`;
  return (
    <FormControl fullWidth>
      <InputLabel size="small" id={labelId}>
        Nom de l'enquête
      </InputLabel>
      <Select size="small" labelId={labelId} id={id} label="Age" {...props}>
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
