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

export const SearchTextField = ({ isResetButton, label, inputProps }: Props) => {
  return (
    <TextField
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="search" type={isResetButton ? "reset" : "submit"} edge="end">
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
