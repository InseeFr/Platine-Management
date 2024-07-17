import { useNavigate } from "react-router-dom";
import {
  EditPrimaryWithoutSecondaryDialog,
  EditSecondaryToPrimaryDialog,
  PrimaryContactRightsDialog,
} from "./ContactRightsDialogs.tsx";
import { APISchemas } from "../../types/api.ts";

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
  onAlert: (message: { type: "error" | "success"; content: string }) => void;
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
  if (survey.secondaryContacts.length === 0) {
    return <EditPrimaryWithoutSecondaryDialog open onClose={onClose} />;
  }
  return (
    <PrimaryContactRightsDialog
      open
      onClose={onClose}
      secondaryContacts={survey.secondaryContacts}
      contactIdentifier={contact.identifier}
      onChangePrimaryContact={onEditPrimaryContact}
    />
  );
};
