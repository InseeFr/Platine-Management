import Typography from "@mui/material/Typography";
import { FormDialog } from "./FormDialog";
import Stack from "@mui/material/Stack";
import { FormEventHandler, useState } from "react";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { APISchemas } from "../../types/api";
import { useToggle } from "react-use";
import { CreateContactDialog } from "./CreateContact/CreateContactDialog";

export type CommonContactRightsProps = {
  open: boolean;
  onClose: () => void;
  onAlert?: (message: { type: "error" | "success"; content: string }) => void;
};

type DeleteSecondaryContactRightsProps = CommonContactRightsProps & {
  source: string;
  contactIdentifier: string;
};

export const DeleteSecondaryContactRightsDialog = ({
  open,
  source,
  contactIdentifier,
  onAlert,
  onClose,
}: DeleteSecondaryContactRightsProps) => {
  const onDelete = () => {
    onAlert &&
      onAlert({
        type: "success",
        content: `Le contact ${contactIdentifier} a perdu son droit de répondre à la source ${source}`,
      });
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
  const [hasDialog, toggleDialog] = useToggle(false);

  const goToCreateContactForm: FormEventHandler = e => {
    e.preventDefault();
    toggleDialog();
  };

  return (
    <FormDialog
      open={open}
      onCancel={onClose}
      onSubmit={goToCreateContactForm}
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
      <CreateContactDialog
        open={hasDialog}
        onClose={() => {
          toggleDialog();
          onClose();
        }}
      />
    </FormDialog>
  );
};

type PrimaryContactRightsProps = CommonContactRightsProps & {
  type?: string;
  contactIdentifier: string;
  secondaryContacts: APISchemas["ContactFirstLoginDto"][];
};

export const PrimaryContactRightsDialog = ({
  open,
  secondaryContacts,
  type = "edit",
  contactIdentifier,
  onClose,
}: PrimaryContactRightsProps) => {
  const [selectedContact, setSelectedContact] = useState("");
  const [hasDialog, toggleDialog] = useToggle(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedContact(event.target.value);
  };

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();

    if (selectedContact === "newContact") {
      toggleDialog();
    }
    // add logic for other options
  };

  return (
    <FormDialog
      open={open}
      onCancel={() => {
        setSelectedContact("");
        onClose();
      }}
      onSubmit={onSubmit}
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
      <CreateContactDialog
        open={hasDialog}
        onClose={() => {
          toggleDialog();
          onClose();
        }}
      />
    </FormDialog>
  );
};

type EditSecondaryToPrimaryProps = CommonContactRightsProps & {
  contactIdentifier: string;
  primaryContactIdentifier?: string;
};

export const EditSecondaryToPrimaryDialog = ({
  open,
  onClose,
  onAlert,
  contactIdentifier,
  primaryContactIdentifier,
}: EditSecondaryToPrimaryProps) => {
  const onEdit: FormEventHandler = e => {
    e.preventDefault();
    onClose();

    onAlert &&
      onAlert({
        type: "success",
        content: `Le contact ${contactIdentifier} a bien été défini comme contact principal`,
      });
  };

  return (
    <FormDialog
      open={open}
      onCancel={onClose}
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
          automatiquement modifié en contact secondaire
        </Typography>
      </Stack>
    </FormDialog>
  );
};

export const EditPrimaryWithoutSecondaryDialog = ({ open, onClose }: CommonContactRightsProps) => {
  const [hasDialog, toggleDialog] = useToggle(false);

  const goToCreateContactForm: FormEventHandler = e => {
    e.preventDefault();
    toggleDialog();
  };

  return (
    <FormDialog
      open={open}
      onCancel={onClose}
      onSubmit={goToCreateContactForm}
      title={"Modifier en contact secondaire"}
      submitButtonLabel="Créer un contact"
    >
      <Stack gap={2} textAlign={"center"} color="text.secondary" px={5}>
        <Typography variant="bodyMedium">Une enquête doit avoir un contact principal.</Typography>
        <Typography variant="bodyMedium">Voulez vous créer un nouveau contact principal ?</Typography>
      </Stack>
      <CreateContactDialog
        open={hasDialog}
        onClose={() => {
          toggleDialog();
          onClose();
        }}
      />
    </FormDialog>
  );
};
