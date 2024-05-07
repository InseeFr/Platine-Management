import {
  DeletePrimaryWithoutSecondaryDialog,
  DeleteSecondaryContactRightsDialog,
  PrimaryContactRightsDialog,
} from "./ContactRightsDialogs";
import { DialogProps } from "./ContactRightsEditDialog";

export const ContactRightsDeleteDialog = ({ survey, contact, onAlert, onClose }: DialogProps) => {
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
  if (survey.secondaryContacts.length === 0) {
    return <DeletePrimaryWithoutSecondaryDialog open onClose={onClose} />;
  }

  return (
    <PrimaryContactRightsDialog
      open
      onClose={onClose}
      type="delete"
      secondaryContacts={survey.secondaryContacts}
      contactIdentifier={contact.identifier}
    />
  );
};
