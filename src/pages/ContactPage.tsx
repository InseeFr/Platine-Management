import Divider from "@mui/material/Divider";
import { ContactHeader } from "../ui/Contact/ContactHeader.tsx";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { useParams } from "react-router-dom";
import { Row } from "../ui/Row.tsx";
import { CircularProgress, Stack, Tabs } from "@mui/material";
import { type SyntheticEvent, useState } from "react";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";
import { ContactInfosTab } from "./Contact/ContactInfosTab.tsx";
import { PageTab } from "../ui/PageTab.tsx";

enum Tab {
  Infos = "Infos",
  Surveys = "Surveys",
  Ids = "Ids",
  Permissions = "Permissions",
}

const TabNames = {
  [Tab.Infos]: "Infos contact",
  [Tab.Surveys]: "Enquête(s)",
  [Tab.Ids]: "Gestion des identifiants",
  [Tab.Permissions]: "Gestion des droits",
};

export function ContactPage() {
  const { id } = useParams();
  const { data: contact, refetch } = useFetchQuery("/api/contacts/{id}", {
    urlParams: {
      id: id!,
    },
  });
  const [currentTab, setCurrentTab] = useState(Tab.Infos);
  const handleChange = (_: SyntheticEvent, newValue: Tab) => {
    setCurrentTab(newValue);
  };

  if (!contact) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/search", title: "Recherche" },
    { href: `/contacts/${contact.identifier}`, title: `${contact.firstName} ${contact.lastName}` },
    TabNames[currentTab],
  ];

  return (
    <>
      <ContactHeader contact={contact} />
      <Divider variant="fullWidth" />
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{
          px: 5,
          backgroundColor: "white",
        }}
      >
        {Object.keys(Tab).map(k => (
          <PageTab key={k} value={k} label={TabNames[k]} />
        ))}
      </Tabs>

      <Stack px={3} py={3}>
        <Breadcrumbs items={breadcrumbs} />
        {currentTab === Tab.Infos && <ContactInfosTab contact={contact} onSave={refetch} />}
        {currentTab === Tab.Surveys && "1"}
        {currentTab === Tab.Ids && "2"}
        {currentTab === Tab.Permissions && "3"}
      </Stack>
    </>
  );
}
