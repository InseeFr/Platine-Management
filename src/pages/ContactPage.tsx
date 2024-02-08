import Divider from "@mui/material/Divider";
import { ContactHeader } from "../ui/ContactSinglePage/ContactHeader.tsx";
import { useFetchQuery } from "../hooks/useFetchQuery.ts";
import { useParams } from "react-router-dom";
import { Row } from "../ui/Row.tsx";
import { CircularProgress, Tabs } from "@mui/material";
import { ContactTab } from "../ui/ContactSinglePage/CustomTab.tsx";
import { ContactInformationContent } from "../ui/ContactSinglePage/ContactInformationContent.tsx";
import { type SyntheticEvent, useState } from "react";

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

  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/search", title: "Recherche" },
    { href: `/contact/${contact.identifier}`, title: `${contact.firstName} ${contact.lastName}` },
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
        <ContactTab label={"Infos contact"} />
        <ContactTab label={"Enquête(s)"} />
        <ContactTab label={"Gestion des identifiants"} />
        <ContactTab label={"Gestion des droits"} />
      </Tabs>

      {currentTab === 0 && (
        <ContactInformationContent contact={contact} breadcrumbs={[...breadcrumbs, "Infos contact"]} />
      )}
      {currentTab === 1 && "1"}
      {currentTab === 2 && "2"}
      {currentTab === 3 && "3"}
    </>
  );
}
