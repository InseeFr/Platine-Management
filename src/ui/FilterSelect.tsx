import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

type Props = {
  options: { label: string; value: string }[];
  value?: string;
  label: string;
  name: string;
};

export const FilterSelect = ({ options, value, label, name }: Props) => {
  const labelId = `label-${label}`;

  return (
    <FormControl fullWidth variant="filled">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        IconComponent={props => <ExpandMoreOutlinedIcon {...props} sx={{ color: "text.primary" }} />}
        labelId={labelId}
        label={label}
        name={name}
        value={value}
        fullWidth
        id={`select-${name}`}
        displayEmpty
        disableUnderline
        variant="filled"
      >
        {options.map(option => {
          return (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
