import { useNavigate } from "react-router-dom";
import {
  DeletePrimaryWithoutSecondaryDialog,
  DeleteSecondaryContactRightsDialog,
  PrimaryContactRightsDialog,
} from "./ContactRightsDialogs";
import { DialogProps } from "./ContactRightsEditDialog";

export const ContactRightsDeleteDialog = ({ survey, contact, onAlert, open, toggle }: DialogProps) => {
  const navigate = useNavigate();

  const onDeletePrimaryContact = (selectedContact: string) => {
    if (selectedContact === "newContact") {
      navigate("/contacts/createContact");
    }
  };

  if (survey.main === false) {
    return <DeleteSecondaryContactRightsDialog source={survey.source} open={open} toggle={toggle} />;
  }
  return survey.secondaryContacts.length === 0 ? (
    <DeletePrimaryWithoutSecondaryDialog open={open} toggle={toggle} />
  ) : (
    <PrimaryContactRightsDialog
      open={open}
      toggle={toggle}
      type="delete"
      secondaryContacts={survey.secondaryContacts}
      contactIdentifier={contact.identifier}
      onChangePrimaryContact={onDeletePrimaryContact}
    />
  );
};
