import { Button, Card, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { APISchemas } from "../../types/api.ts";
import { LinkWithForwardRef } from "../Link.tsx";

type Props = {
  campaigns?: APISchemas["ContactDetailsDto"]["listCampaigns"];
};

export const ContactCampaignsCard = (props: Props) => {
  const campaigns = props.campaigns?.filter(c => c !== null) ?? [];

  const hasCampaigns = campaigns?.length > 0;

  return (
    <Card sx={{ p: 3, flex: 1 }} elevation={2}>
      <Stack spacing={2}>
        <Typography variant="headlineSmall" component="h2">
          Informations
        </Typography>
        <List dense>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary={<Typography variant="titleSmall">Campagnes</Typography>} />
          </ListItem>

          {campaigns.map(campaign => (
            <ListItem
              key={campaign}
              sx={{ pl: 0 }}
              secondaryAction={
                <Button
                  component={LinkWithForwardRef}
                  to={`/campaigns/${campaign}`}
                  sx={{ typography: "titleSmall" }}
                  endIcon={<OpenInNewIcon />}
                  // TODO: remove disabled when get pages
                  disabled={true}
                >
                  Voir
                </Button>
              }
            >
              <ListItemText primary={<Typography variant="bodyMedium">{campaign}</Typography>} />
              <Divider variant="fullWidth" />
            </ListItem>
          ))}

          {!hasCampaigns && (
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
