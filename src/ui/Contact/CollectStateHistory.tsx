import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableContainer from "@mui/material/TableContainer";
import { CollectStateSelect, collectStates } from "./CollectStateSelect";
import { useFetchMutation, useFetchQuery } from "../../hooks/useFetchQuery";
import { Row } from "../Row";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";

type Props = {
  onClose: () => void;
  open: boolean;
  questioningId: string;
  surveyName: string;
  onSelect: (value: string) => void;
};

export const CollectStateHistory = ({ onClose, open, questioningId, surveyName, onSelect }: Props) => {
  const [dialog, setDialog] = useState<number>();

  const { data: states, refetch } = useFetchQuery("/api/questionings/{id}/questioning-events", {
    urlParams: {
      id: parseInt(questioningId),
    },
  });

  const { mutateAsync, isPending } = useFetchMutation(
    "/api/questionings/questioning-events/{id}",
    "delete",
  );

  if (!states) {
    return;
  }

  const onValidate = async (value: string) => {
    await onSelect(value);
    refetch();
  };

  const onDelete = async (id?: number) => {
    if (!id) {
      return;
    }
    await mutateAsync({
      urlParams: { id },
    });
    setDialog(undefined);
    refetch();
  };

  const sortedStates = states.sort((a, b) => b.eventDate!.localeCompare(a.eventDate!));

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <Row justifyContent={"space-between"}>
          Historique {surveyName} <CollectStateSelect onValidate={onValidate} />
        </Row>
      </DialogTitle>
      <DialogContent
        sx={{
          width: "600px",
          height: "fit-content",
        }}
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#EBEFF5" }}>
              <TableRow>
                <TableCell sx={{ typography: "titleSmall" }}>Date</TableCell>
                <TableCell sx={{ typography: "titleSmall" }}>Heure</TableCell>
                <TableCell sx={{ typography: "titleSmall" }}>Statut</TableCell>
                <TableCell sx={{ typography: "titleSmall" }}>Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedStates.map(state => {
                const date =
                  state.eventDate && new Date(Date.parse(state.eventDate)).toLocaleDateString();
                const hour =
                  state.eventDate && new Date(Date.parse(state.eventDate)).toLocaleTimeString();
                return (
                  <TableRow key={state.id}>
                    <TableCell>{date}</TableCell>
                    <TableCell>{hour}</TableCell>
                    <TableCell>{collectStates.find(cs => cs.value === state.type)?.label}</TableCell>
                    {state.type && ["VALPAP", "PND", "HC", "REFUSAL", "WASTE"].includes(state.type) && (
                      <TableCell align="center">
                        <IconButton
                          aria-label="supprimer"
                          color="inherit"
                          onClick={() => setDialog(state.id)}
                          disabled={isPending}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                        <DeleteDialog
                          onClose={() => setDialog(undefined)}
                          onDelete={() => onDelete(state.id)}
                          open={dialog === state.id}
                          state={state.type}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Retour
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type DeleteDialogProps = {
  onClose: () => void;
  onDelete: () => void;
  open: boolean;
  state: string;
};

const DeleteDialog = ({ onClose, open, state, onDelete }: DeleteDialogProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogContent
        sx={{
          width: "350px",
          height: "fit-content",
          py: 4,
        }}
      >
        Êtes-vous sûr de vouloir supprimer l'état "{collectStates.find(s => s.value === state)?.label}" ?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="contained" onClick={onDelete}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};
