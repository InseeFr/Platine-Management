import { Button, Card, Tab, Tabs } from "@mui/material";
import { FormEventHandler } from "react";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { BinocularIcon } from "../Icon/BinocularIcon.tsx";
import { SearchContactsForm } from "./SearchContactsForm.tsx";
import { SearchSurveysForm } from "./SearchSurveysForm.tsx";
import { SearchSurveyUnitsForm } from "./SearchSurveyUnitsForm.tsx";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import { theme } from "../../theme.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { kebabCase } from "../../functions/string.ts";
import { useSetSearchFilter } from "../../hooks/useSearchFilter.ts";

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
  const setFilter = useSetSearchFilter();
  const handleChange = (_: unknown, tab: string) => {
    navigate("/search/" + kebabCase(tab));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // We could write a more dynamic code but this improves error discovery in TypeScript
    if (currentTab === "surveys") {
      setFilter(currentTab, {
        idSource: data.get("surveyId")!.toString(),
        year: data.get("year") ? parseInt(data.get("year")!.toString(), 10) : undefined,
        periodicity: data.get("period")!.toString(),
      });
    }
    if (currentTab === "surveyUnits") {
      setFilter(currentTab, {
        idSu: data.get("idSu")!.toString(),
        identificationCode: data.get("identificationCode")!.toString(),
        identificationName: data.get("identificationName")!.toString(),
      });
    }
    if (currentTab === "contacts") {
      setFilter(currentTab, {
        identifier: data.get("id")!.toString(),
        name: data.get("name")!.toString(),
        email: data.get("email")!.toString(),
      });
    }
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

        <Stack spacing={3} m={3} component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {currentTab === "contacts" && <SearchContactsForm />}
            {currentTab === "surveys" && <SearchSurveysForm />}
            {currentTab === "surveyUnits" && <SearchSurveyUnitsForm />}
          </Stack>
          <Button
            type="submit"
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
