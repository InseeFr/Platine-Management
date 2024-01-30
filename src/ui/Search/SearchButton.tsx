import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchButtonProps = {
  handleSearch: () => void;
};

export const SearchButton = ({ handleSearch }: SearchButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{ typography: "bodyLarge" }}
      size={"large"}
      onClick={handleSearch}
      startIcon={<SearchIcon />}
    >
      lancer la recherche
    </Button>
  );
};
