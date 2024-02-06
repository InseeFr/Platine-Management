import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ExpandButton } from "../ExpandButton";
import { useState } from "react";
import { Box } from "@mui/system";

export const SearchContactsForm = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <TextField name="id" id="id" label="Identifiant du contact" variant="outlined" size="small" />
        <TextField name="name" id="name" label="Nom/prénom" variant="outlined" size="small" />
        <TextField name="email" id="email" label="Adresse courriel" variant="outlined" size="small" />
      </Stack>
      <ExpandButton label={"Autres champs de recherche"} handleExpandClick={handleExpandClick} />
      {expanded && <Box>Autres champs à ajouter</Box>}
    </Stack>
  );
};
