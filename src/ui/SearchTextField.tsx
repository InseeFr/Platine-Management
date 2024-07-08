import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

type Props = {
  searchValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder: string;
};

export const SearchTextField = ({ searchValue, onChange, onSearch, placeholder }: Props) => {
  return (
    <TextField
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="search" onClick={onSearch} edge="end">
              <SearchIcon color="primary" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={searchValue}
      name="name"
      id="name"
      placeholder={placeholder}
      variant="outlined"
      onChange={onChange}
    />
  );
};
