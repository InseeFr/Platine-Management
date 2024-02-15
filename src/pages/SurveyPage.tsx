import Divider from "@mui/material/Divider";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { useParams } from "react-router-dom";
import { Row } from "../ui/Row.tsx";
import { CircularProgress, Stack, Tabs } from "@mui/material";
import { SurveyTab } from "../ui/ContactSinglePage/CustomTab.tsx";
import { type SyntheticEvent, useState } from "react";
import { SurveyHeader } from "../ui/SurveySinglePage/SurveyHeader.tsx";
import { SurveyInformationContent } from "../ui/SurveySinglePage/SurveyInformationContent.tsx";
import { SurveyCalendarCard } from "../ui/SurveySinglePage/SurveyCalendarCard/SurveyCalendarCard.tsx";
import { SurveyCreateCampaignCard } from "../ui/SurveySinglePage/SurveyCreateCampaignCard.tsx";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";
import { APISchemas } from "../types/api.ts";

const getBreadcrumbs = (survey: APISchemas["SurveyDto"], currentTab: number) => {
  const initialBreadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/search/surveys", title: "Recherche" },
    { href: `/surveys/${survey.id}`, title: `Enquête ${survey.sourceId}` },
  ];

  switch (currentTab) {
    case 0:
      return [...initialBreadcrumbs, "Infos de l'enquête"];
    case 1:
      return [...initialBreadcrumbs, "Calendrier"];
    case 2:
      return [...initialBreadcrumbs, "Unités enquêtées"];
    case 3:
      return [...initialBreadcrumbs, "Suivi Collecte"];
    case 4:
      return [...initialBreadcrumbs, "Nouvelle Campagne"];
    case 5:
      return [...initialBreadcrumbs, "FAQ"];
    case 6:
      return [...initialBreadcrumbs, "Historique"];
    default:
      return [...initialBreadcrumbs];
  }
};

export function SurveyPage() {
  const { id } = useParams();
  const { data: survey } = useFetchQuery("/api/surveys/{id}", {
    urlParams: {
      id: id!,
    },
  });

  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (!survey) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

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
        <SurveyTab label={"Infos de l'enquête"} />
        <SurveyTab label={"Calendrier"} />
        <SurveyTab label={"Unités enquêtées"} />
        <SurveyTab label={"Suivi collecte"} />
        <SurveyTab label={"Nouvelle campagne"} />
        <SurveyTab label={"Faq"} />
        <SurveyTab label={"Historique"} />
      </Tabs>

      <Stack px={3} py={3}>
        <Breadcrumbs items={getBreadcrumbs(survey, currentTab)} />
        {currentTab === 0 && <SurveyInformationContent survey={survey} />}
        {currentTab === 1 && "1" && <SurveyCalendarCard survey={survey} />}
        {currentTab === 2 && "2"}
        {currentTab === 3 && "3"}
        {currentTab === 4 && "4" && <SurveyCreateCampaignCard survey={survey} />}
        {currentTab === 5 && "5"}
        {currentTab === 6 && "6"}
      </Stack>
    </>
  );
}
