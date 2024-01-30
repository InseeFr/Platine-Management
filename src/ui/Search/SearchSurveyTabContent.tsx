import { OutlinedInput, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { SearchSurveySelect } from "./SearchSurveySelect.tsx";

// TODO : Replace with true data
const names = ["a1", "a2", "a3", "a4", "a5"];
const years = ["2024", "2023", "2022"];
const periodicity = ["Daily", "Monthly"];

export const SearchSurveyTabContent = () => {
  return (
    <>
      <SearchSurveySelect label={"Nom de l'enquête"} options={names} />
      <SelectWithOptions label={"Année de collecte"} options={years} />
      <SelectWithOptions label={"Périodicité"} options={periodicity} />
    </>
  );
};

type SelectWithOptionsProps = { options: string[]; label: string };

function SelectWithOptions({ options, label }: SelectWithOptionsProps) {
  return (
    <Select
      size="small"
      displayEmpty
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
