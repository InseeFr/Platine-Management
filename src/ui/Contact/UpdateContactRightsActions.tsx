import IconButton from "@mui/material/IconButton";
import { Row } from "../Row";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { APISchemas } from "../../types/api";
import {
  PrimaryContactRightsDialog,
  DeletePrimaryWithoutSecondaryDialog,
  DeleteSecondaryContactRightsDialog,
  EditSecondaryToPrimaryDialog,
  EditPrimaryWithoutSecondaryDialog,
} from "./ContactRightsDialogs";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";

type Props = {
  role: string;
  contact: APISchemas["ContactFirstLoginDto"];
  secondaryContacts: APISchemas["ContactFirstLoginDto"][];
  primaryContact: APISchemas["ContactFirstLoginDto"];
  source: string;
};

export const UpdateContactRightsActions = ({
  role,
  contact,
  secondaryContacts,
  primaryContact,
  source,
}: Props) => {
  const navigate = useNavigate();
  const [openDelete, toggleDelete] = useToggle(false);
  const [openEdit, toggleEdit] = useToggle(false);

  const onDeletePrimaryContact = (selectedContact: string) => {
    if (selectedContact === "newContact") {
      navigate("/contacts/createContact");
    }
  };

  const onEditPrimaryContact = (selectedContact: string) => {
    // TODO: add logic
    if (selectedContact === "newContact") {
      navigate("/contacts/createContact");
    }
  };

  const getDialog = () => {
    if (role === "Secondaire") {
      return (
        <>
          <DeleteSecondaryContactRightsDialog open={openDelete} toggle={toggleDelete} source={source} />
          <EditSecondaryToPrimaryDialog
            open={openEdit}
            toggle={toggleEdit}
            contactIdentifier={contact.identifier}
            primaryContactIdentifier={primaryContact.identifier}
          />
        </>
      );
    }
    return secondaryContacts.length === 0 ? (
      <>
        <DeletePrimaryWithoutSecondaryDialog open={openDelete} toggle={toggleDelete} />
        <EditPrimaryWithoutSecondaryDialog open={openEdit} toggle={toggleEdit} />
      </>
    ) : (
      <>
        <PrimaryContactRightsDialog
          type="delete"
          open={openDelete}
          toggle={toggleDelete}
          secondaryContacts={secondaryContacts}
          contactIdentifier={contact.identifier}
          onChangePrimaryContact={onDeletePrimaryContact}
        />
        <PrimaryContactRightsDialog
          open={openEdit}
          toggle={toggleEdit}
          secondaryContacts={secondaryContacts}
          contactIdentifier={contact.identifier}
          onChangePrimaryContact={onEditPrimaryContact}
        />
      </>
    );
  };

  return (
    <Row justifyContent={"center"}>
      <Row width={"fit-content"} gap={1}>
        <IconButton aria-label="modify" color={"inherit"} onClick={toggleEdit}>
          <BorderColorOutlinedIcon />
        </IconButton>
        <IconButton aria-label="delete" color={"inherit"} onClick={toggleDelete}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Row>
      {getDialog()}
    </Row>
  );
};
