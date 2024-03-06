import { AlertColor, Alert as MUIAlert } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

type Props = {
  type: string;
  content: string;
  onClose?: () => void;
};
export const Alert = ({ type, content, onClose }: Props) => {
  return (
    <MUIAlert
      sx={{ mt: 2 }}
      icon={type === "success" && <CheckCircleOutlineIcon fontSize="inherit" />}
      severity={type as AlertColor}
      onClose={onClose}
    >
      {content}
    </MUIAlert>
  );
};
