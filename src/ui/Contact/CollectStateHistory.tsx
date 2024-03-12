import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableContainer from "@mui/material/TableContainer";
import { collectStates } from "./CollectStateSelect";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { Row } from "../Row";

type Props = {
  onClose: () => void;
  open: boolean;
  questioningId: string;
  surveyName: string;
};

export const CollectStateHistory = ({ onClose, open, questioningId, surveyName }: Props) => {
  const { data: states } = useFetchQuery("/api/questionings/{id}/questioning-events", {
    urlParams: {
      id: parseInt(questioningId),
    },
  });

  if (!states) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  const sortedStates = states.sort((a, b) => a.eventDate!.localeCompare(b.eventDate!));

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Historique {surveyName} </DialogTitle>
      <DialogContent
        sx={{
          width: "500px",
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
                    <TableCell>
                      {collectStates.find(cs => cs.value === state.type)?.label ?? "NO DATA"}
                    </TableCell>
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
