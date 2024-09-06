import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  defaultCategory: string;
  isPending: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export const QuestioningCommentDialog = ({
  open,
  defaultCategory,
  isPending,
  onSubmit,
  onCancel,
}: Props) => {
  const [comment, setComment] = useState("");

  const handleCancel = () => {
    setComment("");
    onCancel();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
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
        <Stack gap={"20px"}>
          <FormControl>
            <FormLabel
              id="comment category"
              sx={{
                typography: "titleSmall",
                color: "black.main",
                pb: 0.5,
                "&.Mui-focused": { color: "black.main" },
              }}
            >
              Sélectionner une catégorie
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-comment-categories"
              name="category"
              defaultValue={defaultCategory}
            >
              <FormControlLabel
                value="Questioning"
                control={<Radio sx={{ color: "primary.main" }} />}
                label="Interrogation"
              />
              <FormControlLabel
                value="SurveyUnit"
                control={<Radio sx={{ color: "primary.main" }} />}
                label="Unité enquêtée"
              />
            </RadioGroup>
          </FormControl>
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
        </Stack>
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
          onClick={() => setComment("")}
        >
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};
