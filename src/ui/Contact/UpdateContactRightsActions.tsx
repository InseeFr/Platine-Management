import IconButton from "@mui/material/IconButton";
import { Row } from "../Row";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useState } from "react";
import { APISchemas } from "../../types/api";
import {
  DeletePrimaryContactRightsDialog,
  DeletePrimaryWithoutSecondaryDialog,
  DeleteSecondaryContactRightsDialog,
} from "./DeleteContactRightsDialogs";

type Props = {
  role: string;
  secondaryContacts: APISchemas["ContactFirstLoginDto"][];
  source: string;
};

export const UpdateContactRightsActions = ({ role, secondaryContacts, source }: Props) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getDialog = () => {
    if (role === "Secondaire") {
      return <DeleteSecondaryContactRightsDialog open={open} onClose={onClose} source={source} />;
    }

    return secondaryContacts.length === 0 ? (
      <DeletePrimaryWithoutSecondaryDialog open={open} onClose={onClose} />
    ) : (
      <DeletePrimaryContactRightsDialog
        open={open}
        onClose={onClose}
        secondaryContacts={secondaryContacts}
      />
    );
  };

  return (
    <Row justifyContent={"center"}>
      <Row width={"fit-content"} gap={1}>
        <IconButton aria-label="modify" color={"inherit"}>
          <BorderColorOutlinedIcon />
        </IconButton>
        <IconButton aria-label="delete" color={"inherit"} onClick={onOpen}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Row>
      {getDialog()}
    </Row>
  );
};
