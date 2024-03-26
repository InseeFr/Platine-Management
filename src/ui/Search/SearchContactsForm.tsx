import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ExpandButton } from "../ExpandButton";
import { useState } from "react";

type Props = {
  filters: { identifier: string; name: string; email: string; city: string; function: string };
};

export const SearchContactsForm = ({ filters }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <TextField
          defaultValue={filters.identifier}
          name="id"
          id="id"
          label="Identifiant du contact"
          variant="outlined"
          size="small"
        />
        <TextField
          defaultValue={filters.name}
          name="name"
          id="name"
          label="Nom/prénom"
          variant="outlined"
          size="small"
        />
        <TextField
          defaultValue={filters.email}
          name="email"
          id="email"
          label="Adresse courriel"
          variant="outlined"
          size="small"
        />
      </Stack>
      <ExpandButton label={"Autres champs de recherche"} handleExpandClick={handleExpandClick} />
      {expanded && (
        <Stack spacing={2}>
          <TextField
            defaultValue={filters.city}
            name="city"
            id="city"
            label="Ville"
            variant="outlined"
            size="small"
          />
          <TextField
            defaultValue={filters.function}
            name="function"
            id="function"
            label="Fonction"
            variant="outlined"
            size="small"
          />
          {/* TODO: keep this filter ? */}
          {/* <TextField name="campaign" id="campaign" label="Campagne" variant="outlined" size="small" /> */}
        </Stack>
      )}
    </Stack>
  );
};
