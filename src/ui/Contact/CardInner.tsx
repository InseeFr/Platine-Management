import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { Row } from "../Row.tsx";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FormDialog } from "./FormDialog.tsx";

type Props = {
  content: ReactNode;
  hasAction?: boolean;
  hasTooltip?: boolean;
  tooltipContent?: ReactNode;
  onDelete?: () => void;
};

//TODO: tooltip style

export const CardInner = ({ content, hasAction, hasTooltip, onDelete, tooltipContent }: Props) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ px: 2, py: 2, backgroundColor: "#EBEFF5" }} elevation={0}>
      <Row spacing={1} justifyContent={"space-between"}>
        {hasTooltip ? (
          <Tooltip title={tooltipContent} placement="left" arrow>
            <Box>{content}</Box>
          </Tooltip>
        ) : (
          content
        )}
        {hasAction && (
          <IconButton sx={{ color: "inherit" }} aria-label="delete" onClick={onOpen}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        )}
      </Row>
      <FormDialog
        open={open}
        onCancel={onClose}
        onSubmit={() => {
          onDelete && onDelete();
          onClose();
        }}
        title={"Suppression d’un commentaire"}
        submitButtonLabel="Supprimer"
      >
        <Typography variant="bodyMedium" textAlign="center" px={6} color="text.secondary">
          Vous êtes sur le point de supprimer un commentaire. Voulez-vous continuer ?
        </Typography>
      </FormDialog>
    </Card>
  );
};
