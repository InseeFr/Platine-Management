import { Card, IconButton } from "@mui/material";
import { ReactNode } from "react";
import { Row } from "../Row";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type Props = {
  content: ReactNode;
  hasAction?: boolean;
  onDelete?: () => void;
};

export const CardInner = ({ content, hasAction, onDelete }: Props) => {
  return (
    <Card sx={{ px: 2, py: 2, backgroundColor: "#EBEFF5" }} elevation={0}>
      <Row spacing={1} justifyContent={"space-between"}>
        {content}
        {hasAction && (
          <IconButton sx={{ color: "inherit" }} aria-label="delete" onClick={onDelete}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        )}
      </Row>
    </Card>
  );
};
