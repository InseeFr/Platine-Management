import { useParams } from "react-router-dom";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { Row } from "../ui/Row.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { theme } from "../theme.tsx";
import { Button, Typography } from "@mui/material";
import { ContactDetailsCard } from "../ui/Contact/ContactDetailsCard.tsx";
import { ContactCampaignsCard } from "../ui/Contact/ContactCampaignsCard.tsx";

export const ContactPage = () => {
  const { id } = useParams();
  const { data: contact, refetch } = useFetchQuery("/api/contacts/{id}", {
    urlParams: {
      id: id!,
    },
  });

  const { data: surveys } = useFetchQuery("/api/contacts/{id}/accreditations", {
    urlParams: {
      id: id!,
    },
  });

  if (!contact || !surveys) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  const contactTitle =
    contact.firstName || contact.lastName
      ? `${contact.firstName ?? ""} ${contact.lastName ?? ""}`
      : "Prénom Nom";

  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/contacts", title: "Contacts" },
    contactTitle,
  ];

  return (
    <>
      <Stack sx={{ backgroundColor: theme.palette.Surfaces.Secondary, px: 6, py: 3 }}>
        <Breadcrumbs items={breadcrumbs} />
        <Typography variant="headlineLarge">{contactTitle}</Typography>
        <Row justifyContent={"space-between"}>
          <Typography variant="bodyMedium">{`ID connexion : #${contact.identifier}`}</Typography>
          <Button
            variant="contained"
            size="large"
            // TODO: remove disabled when get pages
            disabled
          >
            Voir les interrogations
          </Button>
        </Row>
      </Stack>
      <Divider variant="fullWidth" />
      <Stack px={5} pt={3}>
        <Row alignItems={"start"} gap={3}>
          <ContactDetailsCard contact={contact} onSave={refetch} />
          <ContactCampaignsCard surveys={surveys} />
        </Row>
      </Stack>
    </>
  );
};
