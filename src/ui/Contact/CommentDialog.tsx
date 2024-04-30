import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { theme } from "../../theme";
import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";

type Props = {
  open: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export const CommentDialog = ({ open, onSubmit, onCancel }: Props) => {
  const [comment, setComment] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    value.length <= 100 && setComment(value);
  };

  const handleCancel = () => {
    onCancel();
    setComment("");
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
      <DialogTitle>Ajouter un commentaire</DialogTitle>
      <DialogContent
        sx={{
          width: "440px",
          height: "fit-content",
          px: 5,
        }}
      >
        <TextField
          sx={{
            mt: 1,
            ".MuiInputLabel-root": {
              typography: "bodyLarge",
              fontSize: "14px",
            },
            ".MuiInputBase-root": {
              typography: "bodyLarge",
              fontSize: "14px",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.secondary,
            },
          }}
          autoFocus
          id="comment"
          name="comment"
          label="Saisissez votre commentaire"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          value={comment}
          onChange={onChange}
        />
        <Typography
          variant="labelMedium"
          textAlign={"right"}
          lineHeight={"24px"}
          fontWeight={300}
          color={"text.tertiary"}
        >
          {comment.length}/100 caractères
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Annuler</Button>
        <Button type="submit" variant="contained">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};
