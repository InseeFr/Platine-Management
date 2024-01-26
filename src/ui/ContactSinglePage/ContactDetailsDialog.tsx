import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
};
export const ContactDetailsDialog = ({ open, handleClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          console.log(formJson);
          handleClose();
        },
      }}
    >
      <DialogTitle variant="titleMedium" sx={{ fontSize: "20px", lineHeight: "32px" }}>
        Modification des coordonnées
      </DialogTitle>
      <DialogContent>Content</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button type="submit" variant="contained">
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
