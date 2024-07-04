import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  searchValue: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const SearchTextField = ({ searchValue, onSearch, placeholder }: Props) => {
  return (
    <TextField
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon color="primary" />
          </InputAdornment>
        ),
      }}
      value={searchValue}
      name="name"
      id="name"
      placeholder={placeholder}
      variant="outlined"
      onChange={onSearch}
    />
  );
};
