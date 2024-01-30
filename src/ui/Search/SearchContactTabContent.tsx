import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ExpandButton } from "../ExpandButton";
import { useState } from "react";
import { Box } from "@mui/system";

export const SearchContactTabContent = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <TextField id="idContact" label="Identifiant du contact" variant="outlined" size="small" />
        <TextField id="name" label="Nom/prénom" variant="outlined" size="small" />
        <TextField id="email" label="Adresse courriel" variant="outlined" size="small" />
      </Stack>
      <ExpandButton label={"Autres champs de recherche"} handleExpandClick={handleExpandClick} />
      {expanded && <Box>Autres champs à ajouter</Box>}
    </Stack>
  );
};
