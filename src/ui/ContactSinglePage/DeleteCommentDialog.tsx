import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
};
export const DeleteCommentDialog = ({ open, handleClose, onDelete }: Props) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Suppression d'un commentaire</DialogTitle>
      <DialogContent
        sx={{
          mx: 3,
          width: 400,
          textAlign: "center",
          typography: "bodyMedium",
          fontWeight: 400,
          color: "text.secondary",
        }}
      >
        Vous êtes sur le point de supprimer un commentaire. Voulez-vous continuer ?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={onDelete} variant="contained">
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
