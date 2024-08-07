import { Button, Card, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "../Link.tsx";
import { APISchemas } from "../../types/api.ts";

type Props = {
  campaigns?: APISchemas["ContactDetailsDto"]["listCampaigns"];
};

export const ContactCampaignsCard = (props: Props) => {
  const campaigns = props.campaigns ?? [];

  const hasCampaigns = campaigns?.length > 0;

  return (
    <Card sx={{ p: 3, flex: 1 }} elevation={2}>
      <Stack spacing={2}>
        <Typography variant="headlineSmall">Informations</Typography>
        <List dense>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary={<Typography variant="titleSmall">Campagnes</Typography>} />
          </ListItem>

          {hasCampaigns ? (
            campaigns.map(campaign => (
              <div key={campaign}>
                <Divider variant="fullWidth" component="li" />
                <ListItem
                  sx={{ pl: 0 }}
                  secondaryAction={
                    <Button
                      component={Link}
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
