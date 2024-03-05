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
  onAlert: React.Dispatch<
    React.SetStateAction<
      | {
          type: string;
          content: unknown;
        }
      | undefined
    >
  >;
  open: boolean;
  toggle: () => void;
};

export const ContactRightsEditDialog = ({ survey, contact, onAlert, open, toggle }: DialogProps) => {
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
        open={open}
        toggle={toggle}
        contactIdentifier={contact.identifier}
        primaryContactIdentifier={survey.primaryContact?.identifier}
      />
    );
  }
  return survey.secondaryContacts.length === 0 ? (
    <EditPrimaryWithoutSecondaryDialog open={open} toggle={toggle} />
  ) : (
    <PrimaryContactRightsDialog
      open={open}
      toggle={toggle}
      secondaryContacts={survey.secondaryContacts}
      contactIdentifier={contact.identifier}
      onChangePrimaryContact={onEditPrimaryContact}
    />
  );
};
