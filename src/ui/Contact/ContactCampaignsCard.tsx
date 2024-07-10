import { Button, Card, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "../Link";
import { APISchemas } from "../../types/api";

type Props = {
  surveys?: APISchemas["AccreditationDetailDto"][];
};

export const ContactCampaignsCard = (props: Props) => {
  const surveys = props.surveys ?? [];
  const uniqueSurveys = removeDuplicates(surveys);
  return (
    <Card sx={{ p: 3, flex: 1 }} elevation={2}>
      <Stack spacing={2}>
        <Typography variant="headlineSmall">Informations</Typography>
        <List dense>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary={<Typography variant="titleSmall">Campagnes</Typography>} />
          </ListItem>

          {uniqueSurveys?.length > 0 ? (
            uniqueSurveys.map(survey => {
              return (
                <>
                  <Divider variant="fullWidth" component="li" />
                  <ListItem
                    sx={{ pl: 0 }}
                    key={survey.questioningId}
                    secondaryAction={
                      <Button
                        component={Link}
                        to={`/campaigns${survey.campaignId}`}
                        sx={{ typography: "titleSmall" }}
                        endIcon={<OpenInNewIcon />}
                      >
                        Voir
                      </Button>
                    }
                  >
                    <ListItemText
                      primary={<Typography variant="bodyMedium">{survey.campaignId}</Typography>}
                    />
                  </ListItem>
                </>
              );
            })
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
