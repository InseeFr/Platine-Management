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
import { Link } from "../ui/Link.tsx";
import { useSetSearchFilter } from "../hooks/useSearchFilter.ts";

export const ContactPage = () => {
  const setFilter = useSetSearchFilter();

  const { id } = useParams();
  const { data: contact, refetch } = useFetchQuery("/api/contacts/{id}", {
    urlParams: {
      id: id!,
    },
  });

  if (!contact) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  const contactName =
    contact.firstName || contact.lastName
      ? `${contact.firstName ?? ""} ${contact.lastName ?? ""}`
      : "Prénom Nom";

  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/contacts", title: "Contacts" },
    contactName,
  ];

  return (
    <>
      <Stack sx={{ backgroundColor: theme.palette.Surfaces.Secondary, px: 6, py: 3 }}>
        <Breadcrumbs items={breadcrumbs} />
        <Typography variant="headlineLarge">{contactName}</Typography>
        <Row justifyContent={"space-between"}>
          <Typography variant="bodyMedium">{`ID connexion : #${contact.identifier}`}</Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to={`/questionings`}
            onClick={() => {
              return setFilter("questionings", { searchValue: contactName });
            }}
          >
            Voir les interrogations
          </Button>
        </Row>
      </Stack>
      <Divider variant="fullWidth" />
      <Stack px={5} pt={3}>
        <Row alignItems={"start"} gap={3}>
          <ContactDetailsCard contact={contact} onSave={refetch} />
          <ContactCampaignsCard campaigns={contact.listCampaigns} />
        </Row>
      </Stack>
    </>
  );
};
