import {
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
} from "@mui/material";
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
    quality: "5",
  },
  {
    id: 2,
    campaign: "ARTI",
    identificationCode: "SIRET/ID",
    contacts: [{ id: 2, firstName: "Juliette", lastName: "Doe" }],
    status: "VALPAP",
    lastCommunication: "PARTIELINT",
    collectDate: undefined,
    quality: "8",
  },
  {
    id: 3,
    campaign: "ARTI",
    identificationCode: "SIRET/ID",
    contacts: [{ id: 2, firstName: "Juliette", lastName: "Doe" }],
    status: "VALPAP",
    lastCommunication: "PARTIELINT",
    collectDate: undefined,
    quality: "2",
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

const columnsWithQuality: readonly Column[] = [
  { id: "campaign", label: "Campagne", minWidth: "95px" },
  { id: "identificationCode", label: "ID métier", minWidth: "100px" },
  { id: "contacts", label: "Contacts", minWidth: "95px" },
  { id: "status", label: "Statut", minWidth: "150px" },
  { id: "lastCommunication", label: "Dernière communication", minWidth: "150px" },
  { id: "collectDate", label: "Date de collecte", minWidth: "150px" },
  { id: "quality", label: "Qualité", minWidth: "50px" },
  { id: "actions", label: "", minWidth: "50px" },
];

type Props = {
  stateFilter: string;
};

export const SearchQuestioningTable = ({ stateFilter }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<"asc" | "desc">();

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeSelectedRowsPerPage = (event: SelectChangeEvent<string>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedQuestioning = order
    ? questioningsMock.sort((a, b) =>
        order === "asc" ? a.quality.localeCompare(b.quality) : b.quality.localeCompare(a.quality),
      )
    : questioningsMock;

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table aria-label="search questionings table">
        {stateFilter === "recovery" ? (
          <TableHead sx={{ backgroundColor: "#EBEFF5" }}>
            {columnsWithQuality.map(column => (
              <TableCell
                key={column.id}
                style={{ minWidth: column.minWidth }}
                sx={{ typography: "titleSmall", py: 2 }}
                align={column.align ?? "left"}
                sortDirection={column.id === "quality" ? order : false}
              >
                {column.id === "quality" ? (
                  <TableSortLabel
                    active
                    direction={order}
                    onClick={() => (order === "asc" ? setOrder("desc") : setOrder("asc"))}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  <>{column.label} </>
                )}
              </TableCell>
            ))}
          </TableHead>
        ) : (
          <TableHeader columns={columns} />
        )}
        <TableBody>
          {sortedQuestioning
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(questioning => (
              <SearchQuestioningTableRow
                key={questioning.id}
                questioning={questioning}
                stateFilter={stateFilter}
              />
            ))}
        </TableBody>
        {sortedQuestioning.length > rowsPerPage && (
          <CustomTableFooter
            count={sortedQuestioning.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelDisplayedRows="interrogations affichées"
            onChangePage={handleChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            onChangeSelectedRowsPerPage={onChangeSelectedRowsPerPage}
          />
        )}
      </Table>
    </TableContainer>
  );
};
