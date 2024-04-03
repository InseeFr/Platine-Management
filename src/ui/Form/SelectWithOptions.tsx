import { OutlinedInput, Select, MenuItem, SelectChangeEvent } from "@mui/material";

type Option = string | { label: string; value: string };

export type Props = {
  options: Option[];
  label: string;
  name: string;
  value?: string | number;
  onChange?: (e: SelectChangeEvent) => void;
};

const getValue = (o: Option) => {
  return typeof o === "string" ? o : o.value;
};

const getLabel = (o: Option) => {
  return typeof o === "string" ? o : o.label;
};

const getSelectedLabel = (selected: string, options: Option[]) => {
  if (typeof options[0] === "string") {
    return selected;
  }

  const option = options.find((o: Option) => typeof o !== "string" && o.value === selected) as {
    label: string;
    value: string;
  };
  return option.label;
};

export function SelectWithOptions({ options, label, name, onChange, value }: Props) {
  return (
    <Select
      name={name}
      size="small"
      value={value ? getValue(value.toLocaleString()) : ""}
      displayEmpty
      onChange={onChange}
      fullWidth
      input={<OutlinedInput size="small" />}
      renderValue={selected => {
        if (!selected) {
          return <>{label}</>;
        }

        return <>{getSelectedLabel(selected, options)}</>;
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
