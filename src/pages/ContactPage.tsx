import Divider from "@mui/material/Divider";
import { ContactHeader } from "../ui/ContactSinglePage/ContactHeader.tsx";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { useParams } from "react-router-dom";
import { Row } from "../ui/Row.tsx";
import { CircularProgress, Stack, Tabs } from "@mui/material";
import { ContactTab } from "../ui/ContactSinglePage/CustomTab.tsx";
import { ContactInformationContent } from "../ui/ContactSinglePage/ContactInformationContent.tsx";
import { type SyntheticEvent, useState } from "react";
import { APISchemas } from "../types/api.ts";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";

const getBreadcrumbs = (contact: APISchemas["ContactFirstLoginDto"], currentTab: number) => {
  const initialBreadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/search", title: "Recherche" },
    { href: `/contacts/${contact.identifier}`, title: `${contact.firstName} ${contact.lastName}` },
  ];

  switch (currentTab) {
    case 0:
      return [...initialBreadcrumbs, "Infos contact"];
    case 1:
      return [...initialBreadcrumbs, "Enquête(s)"];
    case 2:
      return [...initialBreadcrumbs, "Gestion des identifiants"];
    case 3:
      return [...initialBreadcrumbs, "Gestion des droits"];
    default:
      return [...initialBreadcrumbs];
  }
};

export function ContactPage() {
  const { id } = useParams();
  const { data: contact } = useFetchQuery("/api/contacts/{id}", {
    urlParams: {
      id: id!,
    },
  });
  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (!contact) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

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
        <ContactTab label={"Infos contact"} />
        <ContactTab label={"Enquête(s)"} />
        <ContactTab label={"Gestion des identifiants"} />
        <ContactTab label={"Gestion des droits"} />
      </Tabs>

      <Stack px={3} py={3}>
        <Breadcrumbs items={getBreadcrumbs(contact, currentTab)} />
        {currentTab === 0 && <ContactInformationContent contact={contact} />}
        {currentTab === 1 && "1"}
        {currentTab === 2 && "2"}
        {currentTab === 3 && "3"}
      </Stack>
    </>
  );
}
