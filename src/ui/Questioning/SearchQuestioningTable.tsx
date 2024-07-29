import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Column, CustomTableFooter, TableHeader } from "../TableComponents.tsx";
import { style } from "../Contact/SearchContactTable.tsx";
import { Link } from "../Link.tsx";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";

const questioningsMock = [
  {
    campaign: "ARTI",
    identificationCode: "SIRET/ID",
    contacts: ["John Doe", "Juliette Doe"],
    status: "A expertiser",
    lastCommunication: "PND",
    collectDate: "2024-07-19T07:23:20.156Z",
  },
  {
    campaign: "ARTI",
    identificationCode: "SIRET/ID",
    contacts: ["Juliette Doe"],
    status: "Validée",
    lastCommunication: "VALINT",
    collectDate: undefined,
  },
];

const columns: readonly Column[] = [
  { id: "campaign", label: "Campagne", minWidth: "95px" },
  { id: "identificationCode", label: "ID métier", minWidth: "95px" },
  { id: "contacts", label: "Contacts", minWidth: "95px" },
  { id: "status", label: "Statut", minWidth: "150px" },
  { id: "lastCommunication", label: "Dernière communication", minWidth: "150px" },
  { id: "collectDate", label: "Date de collecte", minWidth: "150px" },
  { id: "actions", label: "", minWidth: "50px" },
];

export const SearchQuestioningTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table aria-label="search questionings table">
        <TableHeader columns={columns} />
        <TableBody>
          {questioningsMock
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(questioning => {
              return (
                <TableRow
                  key={questioning.identificationCode}
                  sx={style.root}
                  hover
                  component={Link}
                  to={`/questionings/`}
                >
                  <TableCell>{questioning.campaign}</TableCell>
                  <TableCell>{questioning.identificationCode}</TableCell>
                  <TableCell>{questioning.contacts.join(", ")}</TableCell>
                  <TableCell>{questioning.status}</TableCell>
                  <TableCell>{questioning.lastCommunication}</TableCell>
                  <TableCell>
                    {questioning.collectDate
                      ? new Date(Date.parse(questioning.collectDate)).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    <ChevronRightIcon fontSize="navigateIcon" color="primary" />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>

        <CustomTableFooter
          count={questioningsMock.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelDisplayedRows="interrogations affichées"
          onChangePage={handleChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};
