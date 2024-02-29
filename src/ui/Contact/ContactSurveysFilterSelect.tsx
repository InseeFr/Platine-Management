import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  options: { label: string; value: string }[];
  defaultValue?: string;
  placeholderLabel?: string;
  label: string;
  name: string;
  onFilterChange: (event: SelectChangeEvent) => void;
};

export const ContactSurveysFilterSelect = ({
  options,
  defaultValue,
  label,
  placeholderLabel,
  name,
  onFilterChange,
}: Props) => {
  const labelId = `label-${label}`;

  return (
    <FormControl>
      <InputLabel size="small" id={labelId}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        label={label}
        name={name}
        fullWidth
        defaultValue={defaultValue ?? placeholderLabel ?? ""}
        onChange={onFilterChange}
        id={`select-${name}`}
        size="small"
        displayEmpty
        sx={{ width: "220px" }}
        renderValue={selected => {
          if (!selected) {
            return <>{label}</>;
          }

          const labelState = options.find(option => selected === option.value)?.label;
          return <>{labelState ?? placeholderLabel}</>;
        }}
      >
        {placeholderLabel && (
          <MenuItem value={"none"} key={placeholderLabel} disabled>
            {placeholderLabel}
          </MenuItem>
        )}
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
