import Stack from "@mui/material/Stack";
import { APISchemas } from "../../types/api";
import Card from "@mui/material/Card";
import { TitleWithIconAndDivider } from "../TitleWithIconAndDivider";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { AddRightsForm } from "./AddRightsForm";
import { Row } from "../Row";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/material/Typography";
import { UpdateContactRightsTable } from "./UpdateContactRightsTable";
import { ContactRightsEditDialog, mockedDataSurveyType } from "./ContactRightsEditDialog";
import { ContactRightsDeleteDialog } from "./ContactRightsDeleteDialog";
import { Alert } from "../Alert";

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
};

export const RightsManagement = ({ contact }: Props) => {
  const [dialog, setDialog] = useState<{
    type: string;
    survey: mockedDataSurveyType;
  }>();
  const [message, setMessage] = useState<{ type: "error" | "success"; content: string }>();
  const dismissDialog = () => {
    setDialog(undefined);
  };

  return (
    <Stack spacing={2}>
      <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
        <TitleWithIconAndDivider
          title={`Ajouter des droits au compte “${contact.identifier}” `}
          IconComponent={LibraryAddOutlinedIcon}
        />
        <AddRightsForm contact={contact} />
      </Card>
      <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
        <TitleWithIconAndDivider
          title={"Modifier/supprimer des droits"}
          IconComponent={ChangeCircleOutlinedIcon}
        />
        <Row spacing={1} pt={1}>
          <InfoOutlinedIcon fontSize="smallIcon" />
          <Typography variant="bodyMedium">
            Suppression des droits : un contact principal ne peut pas être supprimé s’il n’y a pas de
            contact secondaire pouvant devenir principal à sa place <br />
            Modification des droits : un contact principal peut devenir secondaire uniquement dans le cas
            ou un autre contact de l‘enquête peut devenir principal
          </Typography>
        </Row>
        {message && (
          <Alert type={message?.type} content={message.content} onClose={() => setMessage(undefined)} />
        )}
        <UpdateContactRightsTable onAction={setDialog} />

        {dialog?.type === "edit" && (
          <ContactRightsEditDialog
            contact={contact}
            onAlert={setMessage}
            survey={dialog.survey}
            onClose={dismissDialog}
          />
        )}
        {dialog?.type === "delete" && (
          <ContactRightsDeleteDialog
            contact={contact}
            onAlert={setMessage}
            survey={dialog.survey}
            onClose={dismissDialog}
          />
        )}
      </Card>
    </Stack>
  );
};
