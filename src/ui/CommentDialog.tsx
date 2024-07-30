import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type Props = {
  open: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export const CommentDialog = ({ open, onSubmit, onCancel }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        component: "form",
        onSubmit: onSubmit,
      }}
    >
      <DialogTitle sx={{ pt: 3, pb: "20px" }}>Ajouter un commentaire</DialogTitle>
      <DialogContent
        sx={{
          width: "500px",
          height: "fit-content",
        }}
      >
        <TextField
          id="comment"
          name="comment"
          label="Commentaire"
          fullWidth
          multiline
          rows={3}
          InputProps={{
            disableUnderline: true,
          }}
          variant="filled"
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3, gap: 1 }}>
        <Button variant="outlined" onClick={onCancel} size="large">
          Annuler
        </Button>
        <Button type="submit" variant="contained" size="large">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};
