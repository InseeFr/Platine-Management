import { Button, Card, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "../Link.tsx";
import { APISchemas } from "../../types/api.ts";

type Props = {
  surveys?: APISchemas["AccreditationDetailDto"][];
};

export const ContactCampaignsCard = (props: Props) => {
  const surveys = props.surveys ?? [];
  const uniqueSurveys = removeDuplicates(surveys);
  const hasSurveys = uniqueSurveys?.length > 0;

  return (
    <Card sx={{ p: 3, flex: 1 }} elevation={2}>
      <Stack spacing={2}>
        <Typography variant="headlineSmall">Informations</Typography>
        <List dense>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary={<Typography variant="titleSmall">Campagnes</Typography>} />
          </ListItem>

          {hasSurveys ? (
            uniqueSurveys.map(survey => (
              <div key={survey.questioningId}>
                <Divider variant="fullWidth" component="li" />
                <ListItem
                  sx={{ pl: 0 }}
                  secondaryAction={
                    <Button
                      component={Link}
                      to={`/campaigns${survey.campaignId}`}
                      sx={{ typography: "titleSmall" }}
                      endIcon={<OpenInNewIcon />}
                      // TODO: remove disabled when get pages
                      disabled={true}
                    >
                      Voir
                    </Button>
                  }
                >
                  <ListItemText
                    primary={<Typography variant="bodyMedium">{survey.campaignId}</Typography>}
                  />
                </ListItem>
              </div>
            ))
          ) : (
            <ListItem sx={{ pl: 0 }}>
              <ListItemText
                primary={
                  <Typography variant="bodyMedium">Ce contact ne dispose pas d'intérrogation</Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Stack>
    </Card>
  );
};

function removeDuplicates(
  surveys: APISchemas["AccreditationDetailDto"][],
): APISchemas["AccreditationDetailDto"][] {
  const uniqueMap = new Map<string, APISchemas["AccreditationDetailDto"]>();
  surveys.forEach(s => {
    if (s.campaignId && !uniqueMap.has(s.campaignId)) {
      uniqueMap.set(s.campaignId, s);
    }
  });
  return Array.from(uniqueMap.values());
}
