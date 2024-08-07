import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Column, CustomTableFooter, TableHeader } from "../TableComponents.tsx";
import { style } from "../Contact/SearchContactTable.tsx";
import { Link } from "../Link.tsx";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { collectStates } from "../Contact/CollectStateSelect.tsx";

const questioningsMock = [
  {
    id: 1,
    campaign: "ARTI",
    identificationCode: "SIRET/ID",
    contacts: [
      { id: 1, firstName: "John", lastName: "Doe" },
      { id: 2, firstName: "Juliette", lastName: "Doe" },
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
            .map(questioning => {
              return (
                <TableRow
                  key={questioning.identificationCode}
                  sx={style.root}
                  hover
                  component={Link}
                  to={`/questionings/${questioning.id}`}
                >
                  <TableCell>{questioning.campaign}</TableCell>
                  <TableCell>{questioning.identificationCode}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "10vw",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {questioning.contacts
                      .map(contact => `${contact.firstName} ${contact.lastName}`)
                      .join(", ")}
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        typography: "titleSmall",
                        maxWidth: "14vw",
                        textOverflow: "ellipsis",
                      }}
                      label={
                        collectStates.find(state => state.value === questioning.status)?.label ??
                        "Aucun état"
                      }
                      color={getCollectStateChipColor(questioning.status)}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        typography: "titleSmall",
                        maxWidth: "14vw",
                        textOverflow: "ellipsis",
                      }}
                      label={
                        collectStates.find(state => state.value === questioning.lastCommunication)
                          ?.label ?? "Aucun état"
                      }
                      color={getCollectStateChipColor(questioning.status)}
                    />
                  </TableCell>
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
