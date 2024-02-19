import Divider from "@mui/material/Divider";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { useParams } from "react-router-dom";
import { Row } from "../ui/Row.tsx";
import { CircularProgress, Stack, Tabs } from "@mui/material";
import { type SyntheticEvent, useState } from "react";
import { SurveyHeader } from "../ui/Survey/SurveyHeader.tsx";
import { SurveyInfosTab } from "./Survey/SurveyInfosTab.tsx";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";
import { PageTab } from "../ui/PageTab.tsx";
import { SurveyCalendarTab } from "./Survey/SurveyCalendarTab.tsx";
import { SurveyCampaignTab } from "./Survey/SurveyCampaignTab.tsx";

enum Tab {
  Infos = "Infos",
  Calendar = "Calendar",
  SurveyUnits = "SurveyUnits",
  FollowUp = "FollowUp",
  Campaign = "Campaign",
  FAQ = "FAQ",
  History = "History",
}

const TabNames = {
  [Tab.Infos]: "Infos de l'enquête",
  [Tab.Calendar]: "Calendrier",
  [Tab.SurveyUnits]: "Unités enquêtées",
  [Tab.FollowUp]: "Suivi Collecte",
  [Tab.Campaign]: "Nouvelle Campagne",
  [Tab.FAQ]: "FAQ",
  [Tab.History]: "Historique",
};

export function SurveyPage() {
  const { id } = useParams();
  const { data: survey, refetch } = useFetchQuery("/api/surveys/{id}", {
    urlParams: {
      id: id!,
    },
  });

  const [currentTab, setCurrentTab] = useState(Tab.Infos);
  const handleChange = (_: SyntheticEvent, newValue: Tab) => {
    setCurrentTab(newValue);
  };

  if (!survey) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/search/surveys", title: "Recherche" },
    { href: `/surveys/${survey.id}`, title: `Enquête ${survey.sourceId}` },
    TabNames[currentTab],
  ];

  return (
    <>
      <SurveyHeader survey={survey} />
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
          <PageTab
            sx={{
              paddingX: 4,
              paddingY: 3,
              typography: "titleSmall",
              letterSpacing: 0.4,
            }}
            key={k}
            value={k}
            label={TabNames[k]}
          />
        ))}
      </Tabs>

      <Stack px={3} py={3}>
        <Breadcrumbs items={breadcrumbs} />
        {currentTab === Tab.Infos && <SurveyInfosTab survey={survey} onSave={refetch} />}
        {currentTab === Tab.Calendar && <SurveyCalendarTab survey={survey} />}
        {currentTab === Tab.SurveyUnits && "2"}
        {currentTab === Tab.FollowUp && "3"}
        {currentTab === Tab.Campaign && <SurveyCampaignTab survey={survey} />}
        {currentTab === Tab.FAQ && "5"}
        {currentTab === Tab.History && "6"}
      </Stack>
    </>
  );
}
