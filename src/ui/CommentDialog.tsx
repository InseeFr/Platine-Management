import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isPending: boolean;
};

export const CommentDialog = ({ open, onSubmit, onCancel, isPending }: Props) => {
  const [comment, setComment] = useState("");

  const handleCancel = () => {
    setComment("");
    onCancel();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    onSubmit(event);
    setComment("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
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
          onChange={e => setComment(e.target.value)}
          variant="filled"
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3, gap: 1 }}>
        <Button variant="outlined" onClick={handleCancel} size="large">
          Annuler
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={comment.length === 0 || isPending}
        >
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};
