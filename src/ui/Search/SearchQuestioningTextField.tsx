import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  hasResetButton: boolean;
  label: string;
  onReset: () => void;
  onSubmit: () => void;
  inputProps: (name: "searchParam") => {
    id: "searchParam";
    name: "searchParam";
    value: string;
    onChange: (e: any) => void;
  };
};

export const SearchQuestioningTextField = ({
  hasResetButton,
  label,
  inputProps,
  onReset,
  onSubmit,
}: Props) => {
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
            {hasResetButton && (
              <IconButton aria-label={"Réinitialiser la recherche"} onClick={onReset} edge="end">
                {<CloseIcon color="primary" />}
              </IconButton>
            )}
            <IconButton
              aria-label={"Lancer la recherche"}
              variant="contained"
              onClick={onSubmit}
              edge="end"
              sx={{ borderRadius: "0", p: 2, ml: 2 }}
            >
              {<SearchIcon />}
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
