import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  isResetButton: boolean;
  label: string;
  inputProps: (name: "searchParam") => {
    id: "searchParam";
    name: "searchParam";
    value: string;
    onChange: (e: any) => void;
  };
};

export const SearchTextFieldQuestioning = ({ isResetButton, label, inputProps }: Props) => {
  return (
    <TextField
      id="search-field"
      type="search"
      fullWidth
      InputLabelProps={{
        htmlFor: "searchParam",
      }}
      inputProps={{
        "aria-labelledby": "search-field-label",
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={isResetButton ? "Réinitialiser la recherche" : "Lancer la recherche"}
              type={isResetButton ? "reset" : "submit"}
              edge="end"
            >
              {isResetButton ? <CloseIcon color="primary" /> : <SearchIcon color="primary" />}
            </IconButton>
          </InputAdornment>
        ),
        disableUnderline: true,
        ...inputProps("searchParam"),
      }}
      label={label}
      variant="filled"
    />
  );
};
