import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";

export function SearchPanelActions() {
  return (
    <Stack spacing={1.5}>
      <Button
        type="submit"
        variant="contained"
        sx={{ typography: "bodyLarge" }}
        size={"large"}
        startIcon={<SearchIcon />}
      >
        lancer la recherche
      </Button>
      <Button variant="outlined" type="reset" sx={{ typography: "bodyLarge" }} size={"large"}>
        Réinitialiser la recherche
      </Button>
    </Stack>
  );
}
