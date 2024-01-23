import { Box, Button, Card, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { ExpandButton } from "../ui/ExpandButton.tsx";
import { Binocular } from "../ui/Icon/Binocular.tsx";

type SearchPanelProps = {
  defaultTab: number;
};

export const SearchPanel = ({ defaultTab }: SearchPanelProps) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSearch = () => {};

  return (
    <Card
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        height: "fit-content",
      }}
    >
      <Tabs value={currentTab} onChange={handleChange} variant="fullWidth">
        <Tab
          label="Contact"
          classes={"search"}
          icon={<PermIdentityIcon fontSize={"tabTitle"} />}
          iconPosition="top"
        />
        <Tab classes={"search"} label="Enquête" icon={<Binocular />} iconPosition="top" />
        <Tab
          classes={"search"}
          label="Unité enquêtée"
          icon={<CorporateFareIcon fontSize={"tabTitle"} />}
          iconPosition="top"
        />
      </Tabs>
      {currentTab === 0 && (
        <Stack>
          <Typography variant="titleMedium" sx={{ backgroundColor: "#EAE5FE" }} px={3} pt={2} pb={1}>
            Recherche d'un contact
          </Typography>
          <Stack spacing={3} m={3} mt={2}>
            <Stack spacing={2}>
              <TextField
                id="idContact"
                label="Identifiant du contact"
                variant="outlined"
                size="search"
              />
              <TextField id="name" label="Nom/Prénom" variant="outlined" size="search" />
              <TextField id="email" label="Adresse courriel" variant="outlined" size="search" />
            </Stack>

            <ExpandButton label={"Autres champs de recherche"} handleExpandClick={handleExpandClick} />
            {expanded && <Box>Autres champs à ajouter</Box>}
            <Button
              variant="contained"
              sx={{ typography: "bodyLarge" }}
              size={"large"}
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
              lancer la recherche
            </Button>
          </Stack>
        </Stack>
      )}
      {currentTab === 1 && <Box>2</Box>}
      {currentTab === 2 && <Box>3</Box>}
    </Card>
  );
};
