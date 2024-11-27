import { Chip, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getCollectStateChipColor } from "./SearchQuestioningTable.tsx";
import { collectStatus } from "../../constants/collectStatus.ts";
import { APISchemas } from "../../types/api.ts";
import { HistoryDialog } from "./HistoryDialog.tsx";

type Props = {
  onClose: () => void;
  open: boolean;
  questioning: APISchemas["QuestioningDetailsDto"];
};

export const StatusHistory = ({ onClose, open, questioning }: Props) => {
  const sortedStatus =
    questioning.listEvents?.sort((a, b) => b.eventDate!.localeCompare(a.eventDate!)) ?? [];

  return (
    <HistoryDialog onClose={onClose} open={open} title={"Historique des statuts"}>
      <TableHead sx={{ backgroundColor: "#EBEFF5" }}>
        <TableRow>
          <TableCell sx={{ typography: "titleSmall", width: "115px" }}>Date</TableCell>
          <TableCell sx={{ typography: "titleSmall", width: "75px" }}>Heure</TableCell>
          <TableCell sx={{ typography: "titleSmall", width: "120px" }}>Type</TableCell>
          <TableCell sx={{ typography: "titleSmall" }}>Statut</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedStatus.map(statusElement => {
          const date =
            statusElement.eventDate &&
            new Date(Date.parse(statusElement.eventDate)).toLocaleDateString();
          const hour =
            statusElement.eventDate &&
            new Date(Date.parse(statusElement.eventDate)).toLocaleTimeString();

          const source =
            typeof statusElement.payload === "object" && "source" in statusElement.payload
              ? statusElement.payload.source
              : undefined;
          const type = source === "platine-gestion" ? "Manuel" : "Automatique";

          return (
            <TableRow key={statusElement.id}>
              <TableCell>{date}</TableCell>
              <TableCell>{hour}</TableCell>
              <TableCell>{type} </TableCell>
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
    </HistoryDialog>
  );
};
