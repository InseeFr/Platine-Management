import { Button, Card, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "../Link";

//TODO: remove mock
const campaigns = ["ARTI2023", "TIC2022", "ARTI2022"];

export const ContactCampaignsCard = () => {
  return (
    <Card sx={{ p: 3, flex: 1 }} elevation={2}>
      <Stack spacing={2}>
        <Typography variant="headlineSmall">Informations</Typography>
        <List dense>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary={<Typography variant="titleSmall">Campagnes</Typography>} />
          </ListItem>

          {campaigns?.length > 0 ? (
            campaigns.map(campaign => {
              return (
                <>
                  <Divider variant="fullWidth" component="li" />
                  <ListItem
                    sx={{ pl: 0 }}
                    key={campaign}
                    secondaryAction={
                      <Button
                        component={Link}
                        to={"/"}
                        sx={{ typography: "titleSmall" }}
                        endIcon={<OpenInNewIcon />}
                      >
                        Voir
                      </Button>
                    }
                  >
                    <ListItemText primary={<Typography variant="bodyMedium">{campaign}</Typography>} />
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
