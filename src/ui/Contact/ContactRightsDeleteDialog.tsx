import { useNavigate } from "react-router-dom";
import {
  DeletePrimaryWithoutSecondaryDialog,
  DeleteSecondaryContactRightsDialog,
  PrimaryContactRightsDialog,
} from "./ContactRightsDialogs";
import { DialogProps } from "./ContactRightsEditDialog";

export const ContactRightsDeleteDialog = ({ survey, contact, onAlert, onClose }: DialogProps) => {
  const navigate = useNavigate();

  const onDeletePrimaryContact = (selectedContact: string) => {
    if (selectedContact === "newContact") {
      navigate("/contacts/createContact");
    }
  };

  if (survey.main === false) {
    return (
      <DeleteSecondaryContactRightsDialog
        contactIdentifier={contact.identifier}
        source={survey.source}
        open
        onClose={onClose}
        onAlert={onAlert}
      />
    );
  }
  return survey.secondaryContacts.length === 0 ? (
    <DeletePrimaryWithoutSecondaryDialog open onClose={onClose} />
  ) : (
    <PrimaryContactRightsDialog
      open
      onClose={onClose}
      type="delete"
      secondaryContacts={survey.secondaryContacts}
      contactIdentifier={contact.identifier}
      onChangePrimaryContact={onDeletePrimaryContact}
    />
  );
};
