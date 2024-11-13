import { Button, Card, Stack, Typography } from "@mui/material";
import { Row } from "../Row.tsx";
import { Link } from "../Link.tsx";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { StatesCard } from "./StatesCard.tsx";
import { QuestioningCommentsCard } from "./QuestioningCommentsCard.tsx";

type Props = {
  questioning: any;
};

export const QuestioningInfos = ({ questioning }: Props) => {
  return (
    <Row gap={3} alignItems={"start"}>
      <Card sx={{ p: 3, flex: 1 }} elevation={2}>
        <Stack gap={2}>
          <Typography variant={"headlineSmall"} component="h2">
            Informations
          </Typography>

          {/* TODO: use this List when get data */}
          {/* <List dense>
            <ListItem sx={{ px: 0 }}>
              <ListItemText primary={<Typography variant="titleSmall">Répondants</Typography>} />
            </ListItem>

            {questioning.contacts.map((contact: any) => (
              <div key={contact.id}>
                <Divider variant="fullWidth" component="li" />
                <ListItem
                  sx={{ px: 0 }}
                  secondaryAction={
                    <Button
                      component={Link}
                      to={`/contacts/${contact.id}`}
                      sx={{ typography: "titleSmall" }}
                      size="large"
                      endIcon={<OpenInNewIcon />}
                    >
                      Voir
                    </Button>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography variant="bodyMedium">{`${contact.firstName} ${contact.lastName}`}</Typography>
                    }
                  />
                </ListItem>
              </div>
            ))}
          </List> */}
          <Stack gap={1} sx={{ pr: 2 }}>
            <Typography variant="titleSmall" component="h3">
              Unité enquêtée
            </Typography>
            <Row justifyContent={"space-between"}>
              <Typography variant="bodyMedium">{questioning.surveyUnitIdentificationCode}</Typography>
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
        <StatesCard questioning={questioning} />
        <QuestioningCommentsCard questioning={questioning} />
      </Stack>
    </Row>
  );
};
