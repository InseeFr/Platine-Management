import { OutlinedInput, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { SearchSurveySelect } from "./SearchSurveySelect.tsx";

// TODO : Replace with true data
const names = ["a1", "a2", "a3", "a4", "a5"];
const years = ["2024", "2023", "2022"];
const periodicity = ["Daily", "Monthly"];

export const SearchSurveysForm = () => {
  return (
    <>
      <SearchSurveySelect name="surveyId" label={"Nom de l'enquête"} options={names} />
      <SelectWithOptions name="year" label={"Année de collecte"} options={years} />
      <SelectWithOptions name="period" label={"Périodicité"} options={periodicity} />
    </>
  );
};

export type SelectWithOptionsProps = { options: string[]; label: string; name: string };

export function SelectWithOptions({ options, label, name }: SelectWithOptionsProps) {
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
      {options.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
