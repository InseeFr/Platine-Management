import Divider from "@mui/material/Divider";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { useParams } from "react-router-dom";
import { Row } from "../ui/Row.tsx";
import { CircularProgress, Stack, Tabs } from "@mui/material";
import { type SyntheticEvent, useState } from "react";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";
import { PageTab } from "../ui/PageTab.tsx";
import { SurveyUnitHeader } from "../ui/SurveyUnit/SurveyUnitHeader.tsx";
import { SurveyUnitInfos } from "../ui/SurveyUnit/SurveyUnitInfos.tsx";
import { SurveyUnitContacts } from "../ui/SurveyUnit/SurveyUnitContacts.tsx";
import { SurveyUnitSurveys } from "../ui/SurveyUnit/SurveyUnitSurveys.tsx";

enum Tab {
  Infos = "Infos",
  Contacts = "Contacts",
  Surveys = "Surveys",
}

const TabNames = {
  [Tab.Infos]: "Infos unité enquêtée",
  [Tab.Contacts]: "Contact(s)",
  [Tab.Surveys]: "Enquête(s)",
};

export function SurveyUnitPage() {
  const { id } = useParams();
  const { data: su, refetch } = useFetchQuery("/api/survey-units/{id}", {
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

  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/search", title: "Recherche" },
    { href: `/survey-units/${id}`, title: su.identificationName ?? "" },
    TabNames[currentTab],
  ];

  return (
    <>
      <SurveyUnitHeader surveyUnit={su} />
      <Divider variant="fullWidth" />
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{
          px: 5,
          backgroundColor: "white",
        }}
      >
        {Object.keys(Tab).map(k => (
          <PageTab key={k} value={k} label={TabNames[k]} />
        ))}
      </Tabs>

      <Stack px={3} py={3}>
        <Breadcrumbs items={breadcrumbs} />
        {currentTab === Tab.Infos && <SurveyUnitInfos surveyUnit={su} onSave={refetch} />}
        {currentTab === Tab.Contacts && <SurveyUnitContacts />}
        {currentTab === Tab.Surveys && <SurveyUnitSurveys />}
      </Stack>
    </>
  );
}
