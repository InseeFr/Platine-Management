import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { QuestioningsBaseType } from "../hooks/useSearchFilter.ts";
import { SyntheticEvent } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { ListItemText, MenuItem } from "@mui/material";

// TODO remove it when get data
const options = [
  { campaignId: "DVM2024M01", sourceId: "DVM", collect: "2024M01" },
  { campaignId: "DVM2023M01", sourceId: "DVM", collect: "2023M01" },
  { campaignId: "DVM2022M01", sourceId: "DVM", collect: "2022M01" },
  { campaignId: "VPP2024X00", sourceId: "VPP", collect: "2024X00" },
  { campaignId: "VPP2022M01", sourceId: "VPP", collect: "2022M01" },
];

type Props = {
  label: string;
  questioningFilter: QuestioningsBaseType;
  setFilter: (name: "questionings", filter: QuestioningsBaseType) => void;
};

export const FilterSelect = ({ label, questioningFilter, setFilter }: Props) => {
  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    // TODO use endpoint type when get data
    newValue: { campaignId: string; sourceId: string; collect: string } | null,
  ) => {
    if (newValue) {
      setFilter("questionings", { ...questioningFilter, campaignId: newValue.campaignId });
    } else {
      setFilter("questionings", { ...questioningFilter, campaignId: "" });
    }
  };
  return (
    <Autocomplete
      popupIcon={<ExpandMoreOutlinedIcon />}
      clearIcon={<CloseIcon />}
      noOptionsText="Aucune collecte trouvée"
      options={options.sort((a, b) => a.sourceId.localeCompare(b.sourceId))}
      groupBy={option => option.sourceId}
      getOptionLabel={option => option.campaignId}
      filterOptions={(options, { inputValue }) =>
        options.filter(option => option.campaignId.toLowerCase().includes(inputValue.toLowerCase()))
      }
      sx={{ flex: 1 }}
      value={options.find(o => o.campaignId === questioningFilter.campaignId) || null}
      onChange={handleChange}
      renderInput={params => (
        <TextField
          variant="filled"
          {...params}
          label={label}
          InputProps={{ ...params.InputProps, disableUnderline: true }}
        />
      )}
      renderOption={(props, option) => (
        <MenuItem {...props} key={option.campaignId}>
          <ListItemText>{option.collect} </ListItemText>
          {questioningFilter.campaignId === option.campaignId && <CheckIcon fontSize="small" />}
        </MenuItem>
      )}
    />
  );
};
