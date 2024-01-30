import { Button, Card, Tab, Tabs } from "@mui/material";
import { FormEventHandler, useState } from "react";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { Binocular } from "../Icon/Binocular.tsx";
import { SearchContactTabContent } from "./SearchContactTabContent.tsx";
import { SearchSurveyTabContent } from "./SearchSurveyTabContent.tsx";
import { SearchSurveyUnitsTabContent } from "./SearchSurveyUnitsTabContent.tsx";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import { theme } from "../../theme.tsx";

type SearchPanelProps = {
  defaultTab: number;
};

const getSearchTitle = (tab: number) => {
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

const style = {
  root: {
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.text.secondary,
    },
  },
};

export const SearchPanel = ({ defaultTab }: SearchPanelProps) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(Object.fromEntries(data.entries()));
  };

  return (
    <div>
      <Card elevation={2} sx={style.root}>
        <Tabs value={currentTab} onChange={handleChange} variant="fullWidth">
          <Tab
            label="Contact"
            classes={"search"}
            icon={<PermIdentityIcon fontSize={"tabTitle"} />}
            iconPosition="top"
          />
          <Tab classes="search" label="Enquête" icon={<Binocular />} iconPosition="top" />
          <Tab
            classes={"search"}
            label="Unité enquêtée"
            icon={<CorporateFareIcon fontSize={"tabTitle"} />}
            iconPosition="top"
          />
        </Tabs>

        <Typography variant="titleMedium" bgcolor="primary.light" px={3} py={2} textAlign="center">
          {getSearchTitle(currentTab)}
        </Typography>

        <Stack spacing={3} m={3} component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {currentTab === 0 && <SearchContactTabContent />}
            {currentTab === 1 && <SearchSurveyTabContent />}
            {currentTab === 2 && <SearchSurveyUnitsTabContent />}
          </Stack>
          <Button
            variant="contained"
            sx={{ typography: "bodyLarge" }}
            size={"large"}
            startIcon={<SearchIcon />}
          >
            lancer la recherche
          </Button>
        </Stack>
      </Card>
    </div>
  );
};
