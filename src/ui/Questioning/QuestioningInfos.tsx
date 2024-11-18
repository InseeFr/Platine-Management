import { Button, Card, Stack, Typography } from "@mui/material";
import { Row } from "../Row.tsx";
import { Link } from "../Link.tsx";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { StatesCard } from "./StatesCard.tsx";
import { QuestioningCommentsCard } from "./QuestioningCommentsCard.tsx";
import { APISchemas } from "../../types/api.ts";

type Props = {
  questioning: APISchemas["QuestioningDetailsDto"];
  refetch: () => void;
};

export const QuestioningInfos = ({ questioning, refetch }: Props) => {
  const surveyUnitLabel =
    questioning.surveyUnitIdentificationCode !== ""
      ? questioning.surveyUnitIdentificationCode
      : questioning.surveyUnitId;

  return (
    <Row gap={3} alignItems={"start"}>
      <Card sx={{ p: 3, flex: 1 }} elevation={2}>
        <Stack gap={2}>
          <Typography variant={"headlineSmall"} component="h2">
            Informations
          </Typography>

          <Stack gap={1} sx={{ pr: 2 }}>
            <Typography variant="titleSmall" component="h3">
              Unité enquêtée
            </Typography>
            <Row justifyContent={"space-between"}>
              <Typography variant="bodyMedium">{surveyUnitLabel}</Typography>
              <Button
                component={Link}
                to={`/survey-units/${questioning.surveyUnitId}`}
                sx={{ typography: "titleSmall" }}
                size="large"
                endIcon={<OpenInNewIcon />}
              >
                Voir
              </Button>
            </Row>
          </Stack>
          <Stack gap={1} sx={{ pr: 2 }}>
            <Typography variant="titleSmall" component="h3">
              Collecte
            </Typography>
            <Row justifyContent={"space-between"}>
              <Typography variant="bodyMedium">{questioning.campaignId}</Typography>
              <Button
                component={Link}
                to={`/campaigns/${questioning.campaignId}`}
                sx={{ typography: "titleSmall" }}
                endIcon={<OpenInNewIcon />}
                size="large"
              >
                Voir
              </Button>
            </Row>
          </Stack>
        </Stack>
      </Card>
      <Stack sx={{ flex: 1, gap: 3 }}>
        <StatesCard questioning={questioning} refetch={refetch} />
        <QuestioningCommentsCard questioning={questioning} refetch={refetch} />
      </Stack>
    </Row>
  );
};
