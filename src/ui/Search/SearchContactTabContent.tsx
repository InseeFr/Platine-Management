import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ExpandButton } from "../ExpandButton";
import { useState } from "react";
import { Box } from "@mui/system";
import { SearchButton } from "./SearchButton";

export const SearchContactTabContent = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSearch = () => {
    console.log("recherche...");
  };

  return (
    <Stack spacing={3} m={3}>
      <Stack spacing={2}>
        <TextField id="idContact" label="Identifiant du contact" variant="outlined" size="search" />
        <TextField id="name" label="Nom/prénom" variant="outlined" size="search" />
        <TextField id="email" label="Adresse courriel" variant="outlined" size="search" />
      </Stack>
      <ExpandButton label={"Autres champs de recherche"} handleExpandClick={handleExpandClick} />
      {expanded && <Box>Autres champs à ajouter</Box>}
      <SearchButton handleSearch={handleSearch} />
    </Stack>
  );
};
