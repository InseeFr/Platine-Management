import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
};
export const CommentsDialog = ({ open, handleClose }: Props) => {
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
        Ajouter un commentaire
      </DialogTitle>
      <DialogContent>Content</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button type="submit" variant="contained">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};
