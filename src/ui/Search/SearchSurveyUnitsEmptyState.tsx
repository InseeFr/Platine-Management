import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type Props = {
  searchType: string;
  search: string;
  onChangeSearchType: (type: string) => void;
};

export const SearchSurveyUnitsEmptyState = ({ searchType, search, onChangeSearchType }: Props) => {
  const title =
    searchType === "identificationCode"
      ? "Aucune unité enquêtée trouvée pour l’ID métier"
      : "Aucune unité enquêtée trouvée pour la raison sociale";

  return (
    <Card
      elevation={2}
      sx={{
        p: 5,
      }}
    >
      <Stack gap={2} alignItems={"flex-start"}>
        <Typography variant="titleSmall">{`${title} "${search}"`}</Typography>
        {searchType === "identificationCode" ? (
          <Button variant="text" type="submit" onClick={() => onChangeSearchType("identificationName")}>
            Rechercher l’unité enquêtée par raison sociale
          </Button>
        ) : (
          <Button variant="text" type="submit" onClick={() => onChangeSearchType("identificationCode")}>
            Rechercher l’unité enquêtée par ID métier
          </Button>
        )}
      </Stack>
    </Card>
  );
};
