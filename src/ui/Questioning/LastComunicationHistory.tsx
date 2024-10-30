import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableContainer from "@mui/material/TableContainer";
import { getCollectStateChipColor } from "./SearchQuestioningTable.tsx";
import { collectStatus } from "../../constants/collectStatus.ts";

type Props = {
  onClose: () => void;
  open: boolean;
};

const lastCommunicationMock = [
  {
    "id": 8214861,
    "questioningId": 2590569,
    "eventDate": "2024-08-08T05:58:11.842+00:00",
    "type": "WASTE",
  },
  {
    "id": 8214859,
    "questioningId": 2590569,
    "eventDate": "2024-08-08T05:44:02.750+00:00",
    "type": "HC",
  },
  {
    "id": 8214860,
    "questioningId": 2590569,
    "eventDate": "2024-08-08T05:54:09.814+00:00",
    "type": "REFUSAL",
  },
];

export const LastCommunicationHistory = ({ onClose, open }: Props) => {
  // TODO: use endpoint instead
  const communications = lastCommunicationMock;

  const sortedCommunications = communications.sort((a, b) => b.eventDate!.localeCompare(a.eventDate!));

  return (
    <Dialog onClose={onClose} open={open} sx={{ ".MuiPaper-root": { maxWidth: "715px" } }}>
      <DialogTitle sx={{ pb: 2.5 }}>Historique des communications</DialogTitle>
      <DialogContent
        sx={{
          minWidth: "715px",
          width: "fit-content",
          height: "450px",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#EBEFF5" }}>
              <TableRow>
                <TableCell sx={{ typography: "titleSmall", width: "115px" }}>Date</TableCell>
                <TableCell sx={{ typography: "titleSmall", width: "75px" }}>Heure</TableCell>
                <TableCell sx={{ typography: "titleSmall" }}>Type de communication</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCommunications.map(statusElement => {
                const date =
                  statusElement.eventDate &&
                  new Date(Date.parse(statusElement.eventDate)).toLocaleDateString();
                const hour =
                  statusElement.eventDate &&
                  new Date(Date.parse(statusElement.eventDate)).toLocaleTimeString();

                return (
                  <TableRow key={statusElement.id}>
                    <TableCell>{date}</TableCell>
                    <TableCell>{hour}</TableCell>

                    <TableCell>
                      <Chip
                        sx={{
                          typography: "titleSmall",
                          textOverflow: "ellipsis",
                        }}
                        label={
                          collectStatus.find(state => state.value === statusElement.type)?.label ??
                          "Aucun état"
                        }
                        color={getCollectStateChipColor(statusElement.type)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};
