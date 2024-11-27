import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { collectStatus } from "../../constants/collectStatus.ts";
import Select from "@mui/material/Select/Select";

const options = collectStatus.filter(state => ["HC", "REFUSAL", "WASTE"].includes(state.value));

type Props = {
  onClose: () => void;
  open: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const AddStatusDialog = ({ onClose, open, onSubmit }: Props) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        component: "form",
        onSubmit: onSubmit,
      }}
      sx={{ ".MuiPaper-root": { maxWidth: "500px", pb: 2 } }}
    >
      <DialogTitle sx={{ pb: 2.5 }}>Ajouter un statut manuellement</DialogTitle>
      <DialogContent
        sx={{
          width: "500px",
          height: "fit-content",
        }}
      >
        <FormControl fullWidth variant="filled">
          <InputLabel id={"add-status"}>Sélectionner un statut</InputLabel>
          <Select
            IconComponent={props => <ExpandMoreOutlinedIcon {...props} sx={{ color: "text.primary" }} />}
            labelId={"add-status"}
            label={"add-status-select"}
            name={"status"}
            fullWidth
            id={`select-status`}
            displayEmpty
            disableUnderline
            variant="filled"
          >
            {options.map(option => {
              return (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, gap: 1 }}>
        <Button variant="outlined" onClick={onClose} size="large">
          Retour
        </Button>
        <Button variant="contained" type={"submit"} size="large">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};
