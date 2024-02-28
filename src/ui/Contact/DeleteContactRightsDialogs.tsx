import Typography from "@mui/material/Typography";
import { FormDialog } from "./FormDialog";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { APISchemas } from "../../types/api";

export type CommonContactRightsProps = {
  open: boolean;
  onClose: () => void;
};

type DeleteSecondaryContactRightsProps = CommonContactRightsProps & {
  source: string;
};

export const DeleteSecondaryContactRightsDialog = ({
  open,
  onClose,
  source,
}: DeleteSecondaryContactRightsProps) => {
  const onDelete = () => {
    onClose();
  };

  return (
    <FormDialog
      open={open}
      onCancel={onClose}
      onSubmit={() => {
        onDelete();
      }}
      title={"Suppression des droits"}
      submitButtonLabel="Supprimer"
    >
      <Typography variant="bodyMedium" textAlign="center" px={5} color="text.secondary">
        Vous êtes sur le point de supprimer les droits du contact secondaire de la source : <br /> “
        {source}”.
      </Typography>
    </FormDialog>
  );
};

export const DeletePrimaryWithoutSecondaryDialog = ({ open, onClose }: CommonContactRightsProps) => {
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
      title={"Suppression des droits"}
      submitButtonLabel="Créer un contact"
    >
      <Stack gap={2} textAlign={"center"} color="text.secondary" px={5}>
        <Typography variant="bodyMedium">
          Une enquête doit avoir un contact principal or aucun autre contact n’existe pour cette unité
          enquêtée, pour cette enquête.
        </Typography>
        <Typography variant="bodyMedium">Voulez vous créer un nouveau contact principal ?</Typography>
      </Stack>
    </FormDialog>
  );
};

type DeletePrimaryContactRightsProps = CommonContactRightsProps & {
  secondaryContacts: APISchemas["ContactFirstLoginDto"][];
};

export const DeletePrimaryContactRightsDialog = ({
  open,
  onClose,
  secondaryContacts,
}: DeletePrimaryContactRightsProps) => {
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
      title={"Suppression des droits"}
      submitButtonLabel="Valider"
    >
      <SecondaryContactsList
        secondaryContacts={secondaryContacts}
        onChange={handleChange}
        selectedContact={selectedContact}
      />
    </FormDialog>
  );
};

type SecondaryContactsListProps = {
  secondaryContacts: APISchemas["ContactFirstLoginDto"][];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedContact: string;
};

export const SecondaryContactsList = ({
  secondaryContacts,
  onChange,
  selectedContact,
}: SecondaryContactsListProps) => {
  return (
    <Stack gap={2} textAlign={"center"} color="text.secondary" px={5}>
      <Typography variant="bodyMedium">
        Une enquête doit obligatoirement avoir un contact principal.
      </Typography>
      <Typography variant="bodyMedium">
        Sélectionnez le contact auquel vous souhaitez attribuer les droits “contact principal” :
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="radio-buttons-group"
          name="contact-radio-buttons-group"
          value={selectedContact}
          onChange={onChange}
          sx={{ gap: 1, pl: 4 }}
        >
          {secondaryContacts.map(contact => (
            <FormControlLabel
              key={contact.identifier}
              value={contact.identifier}
              slotProps={{
                typography: {
                  variant: "titleSmall",
                },
              }}
              control={<Radio />}
              label={`${contact.firstName} ${contact.lastName} (${contact.identifier})`}
            />
          ))}
          <FormControlLabel
            value={"newContact"}
            slotProps={{
              typography: {
                variant: "titleSmall",
              },
            }}
            control={<Radio />}
            label={"Créer un nouveau contact"}
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};
