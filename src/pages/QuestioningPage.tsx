import { Button, Chip, CircularProgress, Divider, Stack, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { theme } from "../theme.tsx";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";
import { Row } from "../ui/Row.tsx";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { PageTab } from "../ui/PageTab.tsx";
import { QuestioningInfos } from "../ui/Questioning/QuestioningInfos.tsx";
import { collectStatus } from "../constants/collectStatus.ts";
import { getCollectStateChipColor } from "../ui/Questioning/SearchQuestioningTable.tsx";
import { useParams } from "react-router-dom";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { LinkWithForwardRef } from "../ui/Link.tsx";

enum Tab {
  Infos = "Infos",
  Recovery = "Recovery",
}

const TabNames = {
  [Tab.Infos]: "Infos sur l'interrogation",
  [Tab.Recovery]: "Reprise",
};

export const QuestioningPage = () => {
  const { id } = useParams();

  const { data: questioning, refetch } = useFetchQuery("/api/questionings/{id}", {
    urlParams: {
      id: parseInt(id!),
    },
  });

  const [currentTab, setCurrentTab] = useState(Tab.Infos);
  const handleChange = (_: SyntheticEvent, newValue: Tab) => {
    setCurrentTab(newValue);
  };

  if (!questioning) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  const label = `Interrogation ${questioning.questioningId}`;
  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/questionings", title: "Interrogations" },
    label,
  ];

  const hasNoQuestioningUrl = questioning.readOnlyUrl === null || questioning.readOnlyUrl === "";

  return (
    <>
      <Stack px={6} py={3} sx={{ backgroundColor: theme.palette.Surfaces.Secondary }}>
        <Breadcrumbs items={breadcrumbs} />
        <Typography component="h1" variant="headlineLarge">
          {label}
        </Typography>
        <Row justifyContent={"space-between"} pt={1}>
          <Row gap={2}>
            {questioning.lastEvent && (
              <Chip
                sx={{
                  typography: "titleSmall",
                }}
                label={
                  collectStatus.find(state => state.value === questioning.lastEvent)?.label ??
                  "Aucun état"
                }
                color={getCollectStateChipColor(questioning.lastEvent)}
              />
            )}
            <Typography component={"span"} variant="bodyMedium">
              {questioning.validationDate &&
                `Collectée le ${new Date(Date.parse(questioning.validationDate)).toLocaleDateString()}`}
            </Typography>
          </Row>
          <Button
            variant="contained"
            disabled={hasNoQuestioningUrl}
            size="large"
            component={LinkWithForwardRef}
            to={questioning.readOnlyUrl ?? ""}
            target="_blank"
            endIcon={<OpenInNewIcon />}
          >
            Voir le questionnaire miroir
          </Button>
        </Row>
      </Stack>
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
        {currentTab === Tab.Infos && <QuestioningInfos questioning={questioning} refetch={refetch} />}
        {currentTab === Tab.Recovery && <></>}
      </Stack>
    </>
  );
};
