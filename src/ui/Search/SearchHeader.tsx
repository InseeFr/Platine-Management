import Typography from "@mui/material/Typography";

type SearchHeaderProps = {
  tab: number;
};

export const SearchHeader = ({ tab }: SearchHeaderProps) => {
  const getTitle = (tab: number) => {
    switch (tab) {
      case 0:
        return "Recherche d’un contact";
      case 1:
        return "Recherche d’une enquête";
      case 2:
        return "Recherche d’une unité enquêtée";
      default:
        return "";
    }
  };
  return (
    <Typography variant="titleMedium" sx={{ backgroundColor: "#EAE5FE" }} px={3} pt={2} pb={1}>
      {getTitle(tab)}
    </Typography>
  );
};
