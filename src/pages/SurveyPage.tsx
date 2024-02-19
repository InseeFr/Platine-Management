import Divider from "@mui/material/Divider";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { useParams } from "react-router-dom";
import { Row } from "../ui/Row.tsx";
import { Box, CircularProgress, Tabs } from "@mui/material";
import { type SyntheticEvent, useState } from "react";
import { SurveyHeader } from "../ui/Survey/SurveyHeader.tsx";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";
import { PageTab } from "../ui/PageTab.tsx";
import { APISchemas } from "../types/api.ts";
import Grid from "@mui/material/Grid";
import { SurveyDetailsCard } from "../ui/Survey/SurveyDetailsCard.tsx";
import { HistoryActionsCard } from "../ui/Contact/HistoryActionsCard.tsx";
import { CommentsCard } from "../ui/Contact/CommentsCard.tsx";
import { SurveyCalendarCard } from "../ui/Survey/SurveyCalendarCard.tsx";
import { SurveyCreateCampaignCard } from "../ui/Survey/SurveyCreateCampaignCard.tsx";

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

      <Breadcrumbs items={breadcrumbs} />

      <Box px={4}>
        <SurveyUnitTab tab={currentTab} survey={survey} onSave={refetch} />
      </Box>
    </>
  );
}

function SurveyUnitTab({
  survey,
  onSave,
  tab,
}: {
  tab: Tab;
  survey: APISchemas["SurveyDto"];
  onSave: () => void;
}) {
  if (tab === Tab.Infos) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SurveyDetailsCard survey={survey} onSave={onSave} />
        </Grid>
        <Grid item xs={6}>
          <HistoryActionsCard />
        </Grid>
        <Grid item xs={6}>
          <CommentsCard />
        </Grid>
      </Grid>
    );
  }

  if (tab === Tab.Calendar) {
    return <SurveyCalendarCard survey={survey} />;
  }

  if (tab === Tab.Campaign) {
    return <SurveyCreateCampaignCard survey={survey} />;
  }

  return;
}
