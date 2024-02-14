import Divider from "@mui/material/Divider";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { useParams } from "react-router-dom";
import { Row } from "../ui/Row.tsx";
import { CircularProgress, Stack, Tabs } from "@mui/material";
import { ContactTab } from "../ui/ContactSinglePage/CustomTab.tsx";
import { type SyntheticEvent, useState } from "react";
import { APISchemas } from "../types/api.ts";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";
import { SurveyHeader } from "../ui/SurveySinglePage/SurveyHeader.tsx";
import { SurveyInformationContent } from "../ui/SurveySinglePage/SurveyInformationContent.tsx";
import { SurveyCalendarCard } from "../ui/SurveySinglePage/SurveyCalendarCard/SurveyCalendarCard.tsx";

const getBreadcrumbs = (survey: APISchemas["SurveyDto"], currentTab: number) => {
  const initialBreadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/search", title: "Recherche" },
    { href: `/surveys/${survey.id}`, title: `${survey.id}` },
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
      return [...initialBreadcrumbs, "Faq"];
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
        <ContactTab label={"Infos contact"} />
        <ContactTab label={"Enquête(s)"} />
        <ContactTab label={"Gestion des identifiants"} />
        <ContactTab label={"Gestion des droits"} />
      </Tabs>

      <Stack px={3} py={3}>
        <Breadcrumbs items={getBreadcrumbs(survey, currentTab)} />
        {currentTab === 0 && <SurveyInformationContent survey={survey} />}
        {currentTab === 1 && "1" && <SurveyCalendarCard survey={survey} />}
        {currentTab === 2 && "2"}
        {currentTab === 3 && "3"}
        {currentTab === 2 && "4"}
        {currentTab === 3 && "5"}
        {currentTab === 2 && "6"}
      </Stack>
    </>
  );
}
