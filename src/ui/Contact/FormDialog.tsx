import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  children: ReactNode;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
};
export const FormDialog = ({
  open,
  onCancel,
  onSubmit,
  title,
  children,
  submitButtonLabel = "Envoyer",
  cancelButtonLabel = "Annuler",
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        component: "form",
        onSubmit,
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          width: "440px",
          height: "fit-content",
        }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelButtonLabel}</Button>
        <Button type="submit" variant="contained">
          {submitButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
