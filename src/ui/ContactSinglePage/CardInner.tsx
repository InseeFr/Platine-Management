import { Box, Card, IconButton, Tooltip } from "@mui/material";
import { ReactNode, useState } from "react";
import { Row } from "../Row";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DeleteCommentDialog } from "./DeleteCommentDialog";

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
          <IconButton sx={{ color: "inherit" }} aria-label="delete" onClick={handleClickOpen}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        )}
      </Row>
      <DeleteCommentDialog
        open={open}
        handleClose={handleClose}
        onDelete={() => {
          onDelete && onDelete();
          handleClose();
        }}
      />
    </Card>
  );
};
