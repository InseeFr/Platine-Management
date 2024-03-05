import Typography from "@mui/material/Typography";
import { FormDialog } from "./FormDialog";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { FormEventHandler, useState } from "react";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { APISchemas } from "../../types/api";
import { useAlertMessage } from "./AlertMessageContext";

export type CommonContactRightsProps = {
  open: boolean;
  toggle: () => void;
};

type DeleteSecondaryContactRightsProps = CommonContactRightsProps & {
  source: string;
};

export const DeleteSecondaryContactRightsDialog = ({
  open,
  source,
}: DeleteSecondaryContactRightsProps) => {
  const onDelete = () => {};

  return (
    <FormDialog
      open={open}
      onCancel={() => {}}
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

export const DeletePrimaryWithoutSecondaryDialog = ({ open }: CommonContactRightsProps) => {
  const navigate = useNavigate();

  const goToCreateContactForm = () => {
    navigate("/contacts/createContact");
  };

  return (
    <FormDialog
      open={open}
      onCancel={() => {}}
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

type PrimaryContactRightsProps = CommonContactRightsProps & {
  type?: string;
  contactIdentifier: string;
  secondaryContacts: APISchemas["ContactFirstLoginDto"][];
  onChangePrimaryContact: (selectedContact: string) => void;
};

export const PrimaryContactRightsDialog = ({
  open,
  secondaryContacts,
  type = "edit",
  contactIdentifier,
  onChangePrimaryContact,
}: PrimaryContactRightsProps) => {
  const [selectedContact, setSelectedContact] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedContact(event.target.value);
  };

  const onSubmit = (selectedContact: string) => {
    onChangePrimaryContact(selectedContact);
  };

  return (
    <FormDialog
      open={open}
      onCancel={() => {
        setSelectedContact("");
      }}
      onSubmit={() => {
        onSubmit(selectedContact);
      }}
      title={type === "edit" ? "Modifier en contact secondaire" : "Suppression des droits"}
      submitButtonLabel="Valider"
    >
      <Stack gap={2} textAlign={"center"} color="text.secondary" px={5}>
        {type === "edit" && (
          <Typography variant="bodyMedium">
            Vous êtes sur le point de modifier le contact {contactIdentifier} en contact secondaire.
          </Typography>
        )}
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

type EditSecondaryToPrimaryProps = CommonContactRightsProps & {
  contactIdentifier: string;
  primaryContactIdentifier?: string;
};

export const EditSecondaryToPrimaryDialog = ({
  open,
  contactIdentifier,
  primaryContactIdentifier,
  toggle,
}: EditSecondaryToPrimaryProps) => {
  const { setMessage } = useAlertMessage();
  const onEdit: FormEventHandler = e => {
    e.preventDefault();
    toggle();
    setMessage({ type: "error", content: "Tout cest bien passé" });
  };

  return (
    <FormDialog
      open={open}
      onCancel={toggle}
      onSubmit={onEdit}
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

export const EditPrimaryWithoutSecondaryDialog = ({ open }: CommonContactRightsProps) => {
  const navigate = useNavigate();

  const goToCreateContactForm: FormEventHandler = e => {
    e.preventDefault();

    navigate("/contacts/createContact");
  };

  return (
    <FormDialog
      open={open}
      onCancel={() => {}}
      onSubmit={goToCreateContactForm}
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
