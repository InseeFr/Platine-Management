import { Box, Card, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useState } from "react";

import Binoculars from "./home/Binoculars";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
type SearchPanelProps = {
  defaultTab: number;
};

export const SearchPanel = ({ defaultTab }: SearchPanelProps) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

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
          sx={{
            typography: "labelMedium",
            textTransform: "none",
          }}
          label="Contact"
          icon={<PermIdentityIcon fontSize={"tabTitle"} />}
          iconPosition="top"
        />
        <Tab
          sx={{
            typography: "labelMedium",
            textTransform: "none",
          }}
          label="Enquête"
          // icon={<Binoculars />}
          iconPosition="top"
        />
        <Tab
          sx={{
            typography: "labelMedium",
            textTransform: "none",
          }}
          label="Unité enquêtée"
          icon={<CorporateFareIcon fontSize={"tabTitle"} />}
          iconPosition="top"
        />
      </Tabs>
      {currentTab === 0 && (
        <Stack spacing={3} m={2}>
          <Typography variant="titleMedium">Recherche d'un contact</Typography>
          <Stack spacing={2}>
            <TextField size="small" id="idContact" label="Identifiant du contact" variant="outlined" />
            <TextField size="small" id="name" label="Nom/prénom" variant="outlined" />
            <TextField size="small" id="email" label="Adresse courriel" variant="outlined" />
          </Stack>
        </Stack>
      )}
      {currentTab === 1 && <Box>2</Box>}
      {currentTab === 2 && <Box>3</Box>}
    </Card>
  );
};
