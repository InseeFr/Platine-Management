import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableContainer from "@mui/material/TableContainer";
import { CollectStateSelect, collectStates } from "./CollectStateSelect";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { Row } from "../Row";

type Props = {
  onClose: () => void;
  open: boolean;
  questioningId: string;
  surveyName: string;
  onSelect: (value: string) => void;
};

export const CollectStateHistory = ({ onClose, open, questioningId, surveyName, onSelect }: Props) => {
  const { data: states } = useFetchQuery("/api/questionings/{id}/questioning-events", {
    urlParams: {
      id: parseInt(questioningId),
    },
  });

  if (!states) {
    return;
  }

  const sortedStates = states.sort((a, b) => b.eventDate!.localeCompare(a.eventDate!));

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <Row justifyContent={"space-between"}>
          Historique {surveyName} <CollectStateSelect onSelect={onSelect} />
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
