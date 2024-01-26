import Divider from "@mui/material/Divider";
import { ContactPanel } from "../ui/ContactSinglePage/ContactPanel";
import { SinglePageContactHeader } from "../ui/ContactSinglePage/SinglePageContactHeader";

export function ContactPage() {
  // TODO: remove mock
  const contact = {
    firstname: "Marie",
    lastname: "Laurent",
    identifier: "MAIV001",
  };
  return (
    <>
      <SinglePageContactHeader
        firstname={contact.firstname}
        lastname={contact.lastname}
        identifier={contact.identifier}
      />
      <Divider variant="fullWidth" />
      <ContactPanel defaultTab={0} />
    </>
  );
}
