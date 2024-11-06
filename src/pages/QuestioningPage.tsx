import { Button, Chip, Divider, Stack, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { theme } from "../theme.tsx";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";
import { Row } from "../ui/Row.tsx";
import { Link } from "../ui/Link.tsx";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { PageTab } from "../ui/PageTab.tsx";
import { QuestioningInfos } from "../ui/Questioning/QuestioningInfos.tsx";
import { collectStatus } from "../constants/collectStatus.ts";
import { getCollectStateChipColor } from "../ui/Questioning/SearchQuestioningTable.tsx";

enum Tab {
  Infos = "Infos",
  Recovery = "Recovery",
}

const TabNames = {
  [Tab.Infos]: "Infos sur l'interrogation",
  [Tab.Recovery]: "Reprise",
};

const questioningMock = {
  id: 2590569,
  label: "TODO LABEL",
  campaign: "TODO COLLECTE LABEL",
  identificationCode: "SIRET/ID",
  idSu: "000005808",
  contacts: [],
  status: "TODO",
  lastCommunication: "TODO",
  collectDate: undefined,
  // collectDate: "2024-07-19T07:23:20.156Z",
  questioningUrl: "/",
  questioningComments: [
    // {
    //   comment: "commentaire 1 interro",
    //   author: "auteur",
    //   commentDate: "2024-08-08T13:10:51.414+00:00",
    // },
    // {
    //   comment: "commentaire 2 interro",
    //   author: "auteur",
    //   commentDate: "2024-08-09T05:25:25.756+00:00",
    // },
    // {
    //   comment: "commentaire 3 interro",
    //   author: "auteur",
    //   commentDate: "2024-09-09T05:25:25.756+00:00",
    // },
  ],
  surveyUnitComments: [
    // {
    //   comment: "commentaire 1 UE",
    //   author: "auteur",
    //   commentDate: "2024-08-08T13:10:51.414+00:00",
    // },
    // {
    //   comment: "commentaire 2 UE",
    //   author: "auteur",
    //   commentDate: "2024-07-09T05:25:25.756+00:00",
    // },
  ],
};

export const QuestioningPage = () => {
  const [currentTab, setCurrentTab] = useState(Tab.Infos);
  const handleChange = (_: SyntheticEvent, newValue: Tab) => {
    setCurrentTab(newValue);
  };

  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/questionings", title: "Interrogations" },
    `${questioningMock.label ?? ""}`,
  ];

  return (
    <>
      <Stack px={6} py={3} sx={{ backgroundColor: theme.palette.Surfaces.Secondary }}>
        <Breadcrumbs items={breadcrumbs} />
        <Typography component="h1" variant="headlineLarge">
          {questioningMock.label}
        </Typography>
        <Row justifyContent={"space-between"} pt={1}>
          <Row gap={2}>
            <Chip
              sx={{
                typography: "titleSmall",
              }}
              label={
                collectStatus.find(state => state.value === questioningMock.status)?.label ??
                "Aucun état"
              }
              color={getCollectStateChipColor(questioningMock.status)}
            />
            <Typography component={"span"} variant="bodyMedium">
              {questioningMock.collectDate &&
                `Collectée le ${new Date(Date.parse(questioningMock.collectDate)).toLocaleDateString()}`}
            </Typography>
          </Row>
          <Button
            variant="contained"
            // remove disabled
            disabled={true}
            size="large"
            component={Link}
            to={questioningMock.questioningUrl}
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
        {currentTab === Tab.Infos && <QuestioningInfos questioning={questioningMock} />}
        {currentTab === Tab.Recovery && <></>}
      </Stack>
    </>
  );
};
