import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type SearchSurveySelectProps = {
  label: string;
  value?: string;
  options?: string[];
  handleChange: (value: string) => void;
};

export const SearchSurveySelect = ({ label, value, options, handleChange }: SearchSurveySelectProps) => {
  const onChange = (event: SelectChangeEvent) => {
    handleChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        sx={{ fontWeight: 600, color: value ? "text.secondary" : "text.tertiary" }}
        style={{}}
        id={`select-${label}`}
      >
        {label}
      </InputLabel>
      <Select size="search" labelId={`select-${label}`} value={value} onChange={onChange}>
        {options?.map(option => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
