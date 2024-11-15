import { Chip, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { APISchemas } from "../../types/api.ts";
import { communicationsList } from "../../constants/communications.ts";
import { HistoryDialog } from "./HistoryDialog.tsx";

type Props = {
  questioning: APISchemas["QuestioningDetailsDto"];
  onClose: () => void;
  open: boolean;
};

export const LastCommunicationHistory = ({ questioning, onClose, open }: Props) => {
  const sortedCommunications =
    questioning.listCommunications?.sort((a, b) => b.date!.localeCompare(a.date!)) ?? [];

  return (
    <HistoryDialog onClose={onClose} open={open} title={"Historique des communications"}>
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
              <TableCell>{communication.status === "AUTOMATIC" ? "Automatique" : "Manuel"}</TableCell>
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
    </HistoryDialog>
  );
};
