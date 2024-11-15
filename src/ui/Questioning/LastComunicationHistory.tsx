import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableContainer from "@mui/material/TableContainer";
import { APISchemas } from "../../types/api.ts";
import { communicationsList } from "../../constants/communications.ts";

type Props = {
  questioning: APISchemas["QuestioningDetailsDto"];
  onClose: () => void;
  open: boolean;
};

export const LastCommunicationHistory = ({ questioning, onClose, open }: Props) => {
  const sortedCommunications =
    questioning.listCommunications?.sort((a, b) => b.date!.localeCompare(a.date!)) ?? [];

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
                <TableCell sx={{ typography: "titleSmall", width: "120px" }}>Type</TableCell>
                <TableCell sx={{ typography: "titleSmall" }}>Type de communication</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCommunications.map(communication => {
                const date =
                  communication.date && new Date(Date.parse(communication.date)).toLocaleDateString();
                const hour =
                  communication.date && new Date(Date.parse(communication.date)).toLocaleTimeString();

                return (
                  <TableRow key={communication.id}>
                    <TableCell>{date}</TableCell>
                    <TableCell>{hour}</TableCell>
                    <TableCell>
                      {communication.status === "AUTOMATIC" ? "Automatique" : "Manuel"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        sx={{
                          typography: "titleSmall",
                          textOverflow: "ellipsis",
                        }}
                        label={
                          communicationsList.find(com => com.value === communication.type)?.label ??
                          "Aucun état"
                        }
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
