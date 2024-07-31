import FormControl from "@mui/material/FormControl";
import { Row } from "../Row.tsx";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import MenuItem from "@mui/material/MenuItem";
import { SearchTextField } from "../SearchTextField.tsx";
import { TextFieldProps } from "@mui/material/TextField";
import { ListItemText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type Props = Pick<TextFieldProps, "sx"> & {
  isResetButton: boolean;
  inputProps: (name: any) => {
    id: any;
    name: any;
    value: string;
    onChange: (e: any) => void;
  };
};

const options = [
  { label: "Idep", value: "identifier" },
  { label: "Prénom et/ou Nom", value: "name" },
  { label: "Email", value: "email" },
];

export const SearchContactFilter = ({ isResetButton, inputProps, sx }: Props) => {
  return (
    <Row gap={2} sx={sx}>
      <FormControl sx={{ minWidth: 200 }} variant="filled">
        <InputLabel id="select-filter-type-label">Mode de recherche</InputLabel>
        <Select
          IconComponent={props => <ExpandMoreOutlinedIcon {...props} sx={{ color: "text.primary" }} />}
          labelId="select-filter-type-label"
          id="select-filter-type"
          variant="filled"
          disableUnderline
          inputProps={inputProps("searchType")}
          renderValue={(selected: string) => {
            if (!selected) {
              return <>Mode de recherche</>;
            }
            return options.find(option => option.value === selected)?.label;
          }}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              <ListItemText sx={{ pr: 2 }}>{option.label} </ListItemText>
              {inputProps("searchType").value === option.value && <CheckIcon fontSize="small" />}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <SearchTextField
        isResetButton={isResetButton}
        label={"Rechercher un contact par Idep, Prénom/Nom ou email"}
        inputProps={inputProps}
      />
    </Row>
  );
};
