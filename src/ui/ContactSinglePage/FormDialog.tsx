import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  form: ReactNode;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
};
export const FormDialog = ({
  open,
  handleClose,
  onSubmit,
  title,
  form,
  primaryButtonLabel,
  secondaryButtonLabel,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit,
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{form}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{secondaryButtonLabel}</Button>
        <Button type="submit" variant="contained">
          {primaryButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
