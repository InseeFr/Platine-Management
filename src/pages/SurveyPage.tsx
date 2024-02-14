import Divider from "@mui/material/Divider";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { useParams } from "react-router-dom";
import { Row } from "../ui/Row.tsx";
import { CircularProgress, Stack, Tabs } from "@mui/material";
import { ContactTab, SurveyTab } from "../ui/ContactSinglePage/CustomTab.tsx";
import { type SyntheticEvent, useState } from "react";
import { SurveyHeader } from "../ui/SurveySinglePage/SurveyHeader.tsx";
import { SurveyInformationContent } from "../ui/SurveySinglePage/SurveyInformationContent.tsx";
import { SurveyCalendarCard } from "../ui/SurveySinglePage/SurveyCalendarCard/SurveyCalendarCard.tsx";

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
