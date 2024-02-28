import Stack from "@mui/material/Stack";
import { CommonContactRightsProps, SecondaryContactsList } from "./DeleteContactRightsDialogs";
import { FormDialog } from "./FormDialog";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { APISchemas } from "../../types/api";

type EditSecondaryToPrimaryProps = CommonContactRightsProps & {
  contactIdentifier: string;
  primaryContactIdentifier: string;
};

export const EditSecondaryToPrimaryDialog = ({
  open,
  onClose,
  contactIdentifier,
  primaryContactIdentifier,
}: EditSecondaryToPrimaryProps) => {
  const onEdit = () => {
    onClose();
  };

  return (
    <FormDialog
      open={open}
      onCancel={onClose}
      onSubmit={() => {
        onEdit();
      }}
      title={"Modifier en contact principal"}
      submitButtonLabel="Modifier"
    >
      <Stack gap={2} textAlign={"center"} color="text.secondary" px={5}>
        <Typography variant="bodyMedium">
          Vous êtes sur le point de modifier le contact {contactIdentifier} en contact principal.
        </Typography>
        <Typography variant="bodyMedium">
          {primaryContactIdentifier} est contact principal pour cette même unité enquêtée, il sera
          automatiquement modifier en contact secondaire
        </Typography>
      </Stack>
    </FormDialog>
  );
};

export const EditPrimaryWithoutSecondaryDialog = ({ open, onClose }: CommonContactRightsProps) => {
  const navigate = useNavigate();

  const goToCreateContactForm = () => {
    onClose();
    navigate("/contacts/createContact");
  };

  return (
    <FormDialog
      open={open}
      onCancel={onClose}
      onSubmit={() => {
        goToCreateContactForm();
      }}
      title={"Modifier en contact secondaire"}
      submitButtonLabel="Créer un contact"
    >
      <Stack gap={2} textAlign={"center"} color="text.secondary" px={5}>
        <Typography variant="bodyMedium">Une enquête doit avoir un contact principal.</Typography>
        <Typography variant="bodyMedium">Voulez vous créer un nouveau contact principal ?</Typography>
      </Stack>
    </FormDialog>
  );
};

type EditPrimaryContactRightsProps = CommonContactRightsProps & {
  secondaryContacts: APISchemas["ContactFirstLoginDto"][];
  contactIdentifier: string;
};

export const EditPrimaryContactRightsDialog = ({
  open,
  onClose,
  secondaryContacts,
  contactIdentifier,
}: EditPrimaryContactRightsProps) => {
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedContact(event.target.value);
  };

  const onChangePrimaryContact = () => {
    onClose();
    if (selectedContact === "newContact") {
      navigate("/contacts/createContact");
    }
  };

  return (
    <FormDialog
      open={open}
      onCancel={() => {
        setSelectedContact("");
        onClose();
      }}
      onSubmit={() => {
        onChangePrimaryContact();
      }}
      title={"Modifier en contact secondaire"}
      submitButtonLabel="Valider"
    >
      <Stack gap={2}>
        <Typography textAlign={"center"} color="text.secondary" px={5} variant="bodyMedium">
          Vous êtes sur le point de modifier le contact {contactIdentifier} en contact secondaire.
        </Typography>
        <SecondaryContactsList
          secondaryContacts={secondaryContacts}
          onChange={handleChange}
          selectedContact={selectedContact}
        />
      </Stack>
    </FormDialog>
  );
};
