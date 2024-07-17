import Divider from "@mui/material/Divider";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { useParams } from "react-router-dom";
import { Row } from "../ui/Row.tsx";
import { CircularProgress, Stack, Tabs } from "@mui/material";
import { type SyntheticEvent, useState } from "react";
import { PageTab } from "../ui/PageTab.tsx";
import { SurveyUnitHeader } from "../ui/SurveyUnit/SurveyUnitHeader.tsx";
import { SurveyUnitInfos } from "../ui/SurveyUnit/SurveyUnitInfos.tsx";
import { SurveyUnitContacts } from "../ui/SurveyUnit/SurveyUnitContacts.tsx";
import { theme } from "../theme.tsx";

enum Tab {
  Infos = "Infos",
  Contacts = "Contacts",
}

const TabNames = {
  [Tab.Infos]: "Infos de l’unité enquêtée",
  [Tab.Contacts]: "Contacts",
};

export function SurveyUnitPage() {
  const { id } = useParams();
  const { data: su } = useFetchQuery("/api/survey-units/{id}", {
    urlParams: {
      id: id!,
    },
  });
  const [currentTab, setCurrentTab] = useState(Tab.Infos);
  const handleChange = (_: SyntheticEvent, newValue: Tab) => {
    setCurrentTab(newValue);
  };

  if (!su) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  return (
    <>
      <SurveyUnitHeader surveyUnit={su} />
      <Divider variant="fullWidth" />
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{
          px: 5,
          backgroundColor: theme.palette.Surfaces.Secondary,
        }}
      >
        {Object.keys(Tab).map(k => (
          <PageTab key={k} value={k} label={TabNames[k]} />
        ))}
      </Tabs>

      <Stack px={3} py={3}>
        {currentTab === Tab.Infos && <SurveyUnitInfos surveyUnit={su} />}
        {currentTab === Tab.Contacts && <SurveyUnitContacts surveyUnit={su} />}
      </Stack>
    </>
  );
}
