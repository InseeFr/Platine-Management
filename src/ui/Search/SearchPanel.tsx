import { Card, Tab, Tabs } from "@mui/material";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { BinocularIcon } from "../Icon/BinocularIcon.tsx";
import { SearchContactsForm } from "./SearchContactsForm.tsx";
import { SearchSurveysForm } from "./SearchSurveysForm.tsx";
import { SearchSurveyUnitsForm } from "./SearchSurveyUnitsForm.tsx";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { theme } from "../../theme.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { kebabCase } from "../../functions/string.ts";

const getSearchTitle = (tab: string) => {
  switch (tab) {
    case "contacts":
      return "Recherche d’un contact";
    case "surveys":
      return "Recherche d’une enquête";
    case "surveyUnits":
      return "Recherche d’une unité enquêtée";
    default:
      return "";
  }
};

export const style = {
  root: {
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.text.secondary,
    },
  },
};

export const SearchPanel = () => {
  const currentTab = useCurrentTab();
  const navigate = useNavigate();

  const handleChange = (_: unknown, tab: string) => {
    navigate("/search/" + kebabCase(tab));
  };

  return (
    <div>
      <Card elevation={2} sx={style.root}>
        <Tabs value={currentTab} onChange={handleChange} variant="fullWidth">
          <Tab
            value="contacts"
            label="Contact"
            classes={"search"}
            icon={<PermIdentityIcon fontSize={"tabTitle"} />}
            iconPosition="top"
          />
          <Tab
            value="surveys"
            classes="search"
            label="Enquête"
            icon={<BinocularIcon />}
            iconPosition="top"
          />
          <Tab
            value="surveyUnits"
            classes={"search"}
            label="Unité enquêtée"
            icon={<CorporateFareIcon fontSize={"tabTitle"} />}
            iconPosition="top"
          />
        </Tabs>

        <Typography variant="titleMedium" bgcolor="primary.light" px={3} py={2} textAlign="center">
          {getSearchTitle(currentTab)}
        </Typography>

        <Stack spacing={3} m={3}>
          <Stack spacing={2}>
            {currentTab === "contacts" && <SearchContactsForm />}
            {currentTab === "surveys" && <SearchSurveysForm />}
            {currentTab === "surveyUnits" && <SearchSurveyUnitsForm />}
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

function useCurrentTab() {
  const location = useLocation();
  switch (location.pathname) {
    case "/search/surveys":
      return "surveys";
    case "/search/survey-units":
      return "surveyUnits";
  }
  return "contacts";
}
