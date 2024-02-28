import IconButton from "@mui/material/IconButton";
import { Row } from "../Row";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useState } from "react";
import { APISchemas } from "../../types/api";
import {
  PrimaryContactRightsDialog,
  DeletePrimaryWithoutSecondaryDialog,
  DeleteSecondaryContactRightsDialog,
  EditSecondaryToPrimaryDialog,
  EditPrimaryWithoutSecondaryDialog,
} from "./ContactRightsDialogs";
import { useNavigate } from "react-router-dom";

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
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const onOpenDelete = () => {
    setOpenDelete(true);
  };

  const onCloseDelete = () => {
    setOpenDelete(false);
  };

  const onOpenEdit = () => {
    setOpenEdit(true);
  };

  const onCloseEdit = () => {
    setOpenEdit(false);
  };

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
          <DeleteSecondaryContactRightsDialog
            open={openDelete}
            onClose={onCloseDelete}
            source={source}
          />
          <EditSecondaryToPrimaryDialog
            open={openEdit}
            onClose={onCloseEdit}
            contactIdentifier={contact.identifier}
            primaryContactIdentifier={primaryContact.identifier}
          />
        </>
      );
    }
    return secondaryContacts.length === 0 ? (
      <>
        <DeletePrimaryWithoutSecondaryDialog open={openDelete} onClose={onCloseDelete} />
        <EditPrimaryWithoutSecondaryDialog open={openEdit} onClose={onCloseEdit} />
      </>
    ) : (
      <>
        <PrimaryContactRightsDialog
          type="delete"
          open={openDelete}
          onClose={onCloseDelete}
          secondaryContacts={secondaryContacts}
          contactIdentifier={contact.identifier}
          onChangePrimaryContact={onDeletePrimaryContact}
        />
        <PrimaryContactRightsDialog
          open={openEdit}
          onClose={onCloseEdit}
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
        <IconButton aria-label="modify" color={"inherit"} onClick={onOpenEdit}>
          <BorderColorOutlinedIcon />
        </IconButton>
        <IconButton aria-label="delete" color={"inherit"} onClick={onOpenDelete}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Row>
      {getDialog()}
    </Row>
  );
};
