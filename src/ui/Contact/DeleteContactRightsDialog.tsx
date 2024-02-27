import Typography from "@mui/material/Typography";
import { FormDialog } from "./FormDialog";
import { APISchemas } from "../../types/api";
import { FormControl, FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  role: string;
  secondaryContacts: APISchemas["ContactFirstLoginDto"][];
  source: string;
};
export const DeleteContactRightsDialog = ({ open, onClose, role, secondaryContacts, source }: Props) => {
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedContact(event.target.value);
  };

  // TODO: add logic in functions
  const onDeleteSecondaryContactRights = () => {
    onClose();
  };

  const onChangePrimaryContact = () => {
    onClose();
    if (selectedContact === "newContact") {
      navigate("/contacts/createContact");
    }
  };

  const goToCreateContactForm = () => {
    onClose();
    navigate("/contacts/createContact");
  };

  if (role === "Secondaire") {
    return (
      <FormDialog
        open={open}
        onCancel={onClose}
        onSubmit={() => {
          onDeleteSecondaryContactRights();
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
  }

  return secondaryContacts.length === 0 ? (
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
  ) : (
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
            onChange={handleChange}
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
    </FormDialog>
  );
};
