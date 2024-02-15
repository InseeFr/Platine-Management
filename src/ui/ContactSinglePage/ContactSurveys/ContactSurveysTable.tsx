import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { MoreAction } from "./MoreActions";

interface Column {
  id: string;
  label: string;
  minWidth?: string;

  format?: (value: number) => string;
}

// TODO: use real ids
const columns: readonly Column[] = [
  { id: "state", label: "Etat de la collecte", minWidth: "330px" },
  { id: "name", label: "Nom enquête", minWidth: "95px" },
  { id: "year", label: "Millésime", minWidth: "95px" },
  { id: "campaign", label: "Campagne", minWidth: "120px" },
  { id: "endDate", label: "Date fin enquête", minWidth: "120px" },
  { id: "surveyUnit", label: "Unité enquêtée", minWidth: "150px" },
  { id: "socialReason", label: "Raison sociale", minWidth: "190px" },
  { id: "role", label: "Rôle", minWidth: "120px" },
  { id: "actions", label: "Actions", minWidth: "100px" },
];

// TODO: remove mock and use real data
const rows = [
  {
    state: "etat de collecte",
    name: "name",
    year: "date",
    campaign: "campagne",
    endDate: "date",
    surveyUnit: "000 000 000",
    socialReason: "xxxxxxxxxxxxxx",
    role: "role",
  },
  {
    state: "etat de collecte 2",
    name: "name 2",
    year: "date 2",
    campaign: "campagne 2",
    endDate: "date 2",
    surveyUnit: "000 000 000 2",
    socialReason: "xxxxxxxxxxxxxx 2",
    role: "role 2",
  },
];

export const ContactSurveysTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <TableContainer>
      <Table aria-label="surveys table">
        <TableHead sx={{ backgroundColor: "#EBEFF5" }}>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                style={{ minWidth: column.minWidth }}
                sx={{ typography: "titleSmall", py: 3 }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
            return (
              <TableRow hover tabIndex={-1} key={`row-${row.name}`}>
                {columns.map(column => {
                  const value = row[column.id];
                  console.log(value);
                  if (!value) {
                    return (
                      <TableCell key={`action-${row.name}`} align="center">
                        <MoreAction />
                      </TableCell>
                    );
                  }
                  if (column.id === "state") {
                    return (
                      <TableCell key={`state-${row.name}`}>
                        <CollectStateChip state={value} />
                      </TableCell>
                    );
                  }
                  return <TableCell key={column.id}>{value}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CollectStateChip = ({ state }: { state: string }) => {
  const handleClick = () => {
    console.log(state);
  };
  // TODO: change color according to data
  return <Chip label={state} onClick={handleClick} />;
};
