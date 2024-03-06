import { useNavigate } from "react-router-dom";
import {
  EditPrimaryWithoutSecondaryDialog,
  EditSecondaryToPrimaryDialog,
  PrimaryContactRightsDialog,
} from "./ContactRightsDialogs";
import { APISchemas } from "../../types/api";

// TODO REMOVE
export type mockedDataSurveyType = {
  source: string;
  year: string;
  periodicity: string;
  vague: string;
  surveyUnit: string;
  identificationName: string;
  main: boolean;
  secondaryContacts: APISchemas["ContactFirstLoginDto"][];
  primaryContact?: APISchemas["ContactFirstLoginDto"];
};

export type DialogProps = {
  contact: APISchemas["ContactFirstLoginDto"];
  survey: mockedDataSurveyType;
  onAlert: (message: { type: string; content: string }) => void;
  onClose: () => void;
};

export const ContactRightsEditDialog = ({ survey, contact, onAlert, onClose }: DialogProps) => {
  const navigate = useNavigate();

  const onEditPrimaryContact = (selectedContact: string) => {
    // TODO: add logic
    if (selectedContact === "newContact") {
      navigate("/contacts/createContact");
    }
  };

  if (survey.main === false) {
    return (
      <EditSecondaryToPrimaryDialog
        open
        onClose={onClose}
        contactIdentifier={contact.identifier}
        primaryContactIdentifier={survey.primaryContact?.identifier}
        onAlert={onAlert}
      />
    );
  }
  return survey.secondaryContacts.length === 0 ? (
    <EditPrimaryWithoutSecondaryDialog open onClose={onClose} />
  ) : (
    <PrimaryContactRightsDialog
      open
      onClose={onClose}
      secondaryContacts={survey.secondaryContacts}
      contactIdentifier={contact.identifier}
      onChangePrimaryContact={onEditPrimaryContact}
    />
  );
};
