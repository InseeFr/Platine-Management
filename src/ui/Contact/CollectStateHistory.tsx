import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableContainer from "@mui/material/TableContainer";
import { collectStates } from "./CollectStateSelect";
import { useFetchQuery } from "../../hooks/useFetchQuery";

const mockHistory = [
  {
    eventDate: "2024-02-21T07:27:50.890Z",
    type: "PND",
  },
  {
    eventDate: "2024-02-21T07:27:50.890Z",
    type: "PARTIELINT",
  },
];
type Props = {
  onClose: () => void;
  open: boolean;
  questioningId: number;
  surveyName: string;
};

export const CollectStateHistory = ({ onClose, open, questioningId, surveyName }: Props) => {
  const { data: states } = useFetchQuery("/api/questionings/{id}/questioning-events", {
    urlParams: {
      id: questioningId,
    },
  });

  // if (!states) {
  //   return (
  //     <Row justifyContent="center" py={10}>
  //       <CircularProgress />
  //     </Row>
  //   );
  // }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Historique {surveyName} </DialogTitle>
      <DialogContent
        sx={{
          width: "700px",
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
              {/* TODO: replace mockHistory by states */}
              {mockHistory.map((state, index) => {
                const formattedDate = new Date(Date.parse(state.eventDate));
                const date = formattedDate.toLocaleDateString();
                const hour = formattedDate.toLocaleTimeString();
                return (
                  <TableRow key={index}>
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
