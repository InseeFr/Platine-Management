import { OutlinedInput, Select, MenuItem } from "@mui/material";

type Option = string | { label: string; value: string };

export type Props = {
  options: Option[];
  label: string;
  name: string;
};

const getValue = (o: Option) => {
  return typeof o === "string" ? o : o.value;
};

const getLabel = (o: Option) => {
  return typeof o === "string" ? o : o.label;
};

export function SelectWithOptions({ options, label, name }: Props) {
  return (
    <Select
      name={name}
      size="small"
      displayEmpty
      fullWidth
      input={<OutlinedInput size="small" />}
      renderValue={selected => {
        if (!selected) {
          return <>{label}</>;
        }

        return <>{selected}</>;
      }}
    >
      {options.map(o => (
        <MenuItem key={getValue(o)} value={getValue(o)}>
          {getLabel(o)}
        </MenuItem>
      ))}
    </Select>
  );
}
