import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Row } from "../Row.tsx";

type Props = {
  searchType: string;
  searchValue: string;
  onChangeSearchType: (type: string) => void;
};

export const SearchContactEmptyState = ({ searchType, searchValue, onChangeSearchType }: Props) => {
  return (
    <Card
      elevation={2}
      sx={{
        p: 5,
      }}
    >
      <Stack gap={2}>
        <Typography variant="titleSmall">{`${getTitle(searchType)} "${searchValue}"`}</Typography>
        <Row gap={2}>
          {searchType === "identifier" ? (
            <Button variant="text" type="submit" onClick={() => onChangeSearchType("name")}>
              Rechercher le contact par Prénom/Nom
            </Button>
          ) : (
            <Button variant="text" type="submit" onClick={() => onChangeSearchType("identifier")}>
              Rechercher le contact par Idep
            </Button>
          )}
          <Typography variant="bodyMedium">ou</Typography>
          {searchType === "email" ? (
            <Button variant="text" type="submit" onClick={() => onChangeSearchType("name")}>
              Rechercher le contact par Prénom/Nom
            </Button>
          ) : (
            <Button variant="text" type="submit" onClick={() => onChangeSearchType("email")}>
              Rechercher le contact par Email
            </Button>
          )}
        </Row>
      </Stack>
    </Card>
  );
};

const getTitle = (searchType: string) => {
  switch (searchType) {
    case "identifier":
      return "Aucun contact trouvé pour l’idep";
    case "name":
      return "Aucun contact trouvé pour Nom/Prénom";
    case "email":
      return "Aucun contact trouvé pour l’email";

    default:
      break;
  }
};
