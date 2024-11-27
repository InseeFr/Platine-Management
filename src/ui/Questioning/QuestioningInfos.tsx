import { Button, Card, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { Row } from "../Row.tsx";
import { Link } from "../Link.tsx";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { StatesCard } from "./StatesCard.tsx";
import { QuestioningCommentsCard } from "./QuestioningCommentsCard.tsx";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { APISchemas } from "../../types/api.ts";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";

type Props = {
  questioning: APISchemas["QuestioningDetailsDto"];
  refetch: () => void;
};

export const QuestioningInfos = ({ questioning, refetch }: Props) => {
  const surveyUnitLabel = questioning.surveyUnitLabel ? `${questioning.surveyUnitLabel} : ` : "";
  const surveyUnitInformations =
    questioning.surveyUnitLabel || questioning.surveyUnitIdentificationCode
      ? `${questioning.surveyUnitIdentificationName} (${surveyUnitLabel}${questioning.surveyUnitIdentificationCode})`
      : questioning.surveyUnitIdentificationName;

  const sortedConctacts = questioning.listContactIdentifiers?.sort((a, b) => a.localeCompare(b)) ?? [];

  return (
    <Row gap={3} alignItems={"start"}>
      <Card sx={{ p: 3, flex: 1 }} elevation={2}>
        <Stack gap={2}>
          <CardtitleWithIcon IconComponent={InfoOutlinedIcon} title={"Informations"} />
          <List dense sx={{ py: 0 }}>
            <ListItem sx={{ px: 0 }}>
              <ListItemText
                primary={
                  <Typography variant="titleSmall" component="h3">
                    Répondant(s)
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="fullWidth" />
            {questioning.listContactIdentifiers &&
              sortedConctacts.map(contact => (
                <ListItem
                  key={contact}
                  sx={{ px: 0 }}
                  secondaryAction={
                    <Button
                      component={Link}
                      to={`/contacts/${contact}`}
                      sx={{ typography: "titleSmall" }}
                      size="large"
                      endIcon={<OpenInNewIcon />}
                    >
                      Voir
                    </Button>
                  }
                >
                  <div style={{ "width": "100%" }}>
                    <ListItemText
                      primary={<Typography variant="bodyMedium">{`#${contact}`}</Typography>}
                    />
                    <Divider variant="fullWidth" />
                  </div>
                </ListItem>
              ))}
          </List>
          <Stack gap={1} sx={{ pr: 2 }}>
            <Typography variant="titleSmall" component="h3">
              Unité enquêtée
            </Typography>
            <Row justifyContent={"space-between"}>
              <Typography variant="bodyMedium">{surveyUnitInformations}</Typography>
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
