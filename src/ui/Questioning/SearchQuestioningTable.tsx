import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { Column, CustomTableFooter, TableHeader } from "../TableComponents.tsx";
import { useState } from "react";
import { SearchQuestioningTableRow } from "./SearchQuestioningTableRow.tsx";

const questioningsMock = [
  {
    id: 1,
    campaign: "ARTI",
    identificationCode: "SIRET/ID",
    contacts: [
      { id: 1, firstName: "John", lastName: "Doe" },
      { id: 2, firstName: "Juliette", lastName: "Doe" },
      { id: 3, firstName: "Walter", lastName: "Doe" },
      { id: 4, firstName: "Jack", lastName: "Doe" },
      { id: 5, firstName: "Jane", lastName: "Doe" },
    ],
    status: "HC",
    lastCommunication: "PND",
    collectDate: "2024-07-19T07:23:20.156Z",
  },
  {
    id: 2,
    campaign: "ARTI",
    identificationCode: "SIRET/ID",
    contacts: [{ id: 2, firstName: "Juliette", lastName: "Doe" }],
    status: "VALPAP",
    lastCommunication: "PARTIELINT",
    collectDate: undefined,
  },
];

export const getCollectStateChipColor = (state?: string) => {
  switch (state) {
    case "PND":
    case "PARTIELINT":
      return "error";
    case "VALINT":
    case "VALPAP":
      return "success";
    default:
      return "default";
  }
};

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
            .map(questioning => (
              <SearchQuestioningTableRow key={questioning.id} questioning={questioning} />
            ))}
        </TableBody>
        {questioningsMock.length > rowsPerPage && (
          <CustomTableFooter
            count={questioningsMock.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelDisplayedRows="interrogations affichées"
            onChangePage={handleChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        )}
      </Table>
    </TableContainer>
  );
};
