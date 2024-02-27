import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { theme } from "../../theme";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/system/Box";
import { UpdateContactRightsActions } from "./UpdateContactRightsActions";

interface Column {
  id: string;
  label: string;
  minWidth?: string;
  align?: "center" | "left" | "right" | "inherit" | "justify";
}

// TODO: use real ids
const columns: readonly Column[] = [
  { id: "source", label: "Source", minWidth: "310px" },
  { id: "year", label: "Millésime", minWidth: "95px" },
  { id: "periodicity", label: "Période", minWidth: "95px" },
  { id: "vague", label: "Vague", minWidth: "95px" },
  { id: "surveyUnit", label: "Unités enquêtées", minWidth: "155px" },

  { id: "identificationName", label: "Raison sociale", minWidth: "280px" },
  { id: "role", label: "Rôle", minWidth: "135px" },
  { id: "action", label: "Actions", minWidth: "150px", align: "center" },
];

// TODO: remove mocks
const mockedData = [
  {
    source: "Source 1",
    year: "2018",
    periodicity: "M11",
    vague: "01",
    surveyUnit: "300000000",
    identificationName: "la raison sociale",
    role: "Principal",
    secondaryContacts: [],
  },
  {
    source: "Source 2",
    year: "2020",
    periodicity: "M11",
    vague: "02",
    surveyUnit: "000000000",
    identificationName: "la raison sociale",
    role: "Secondaire",
    secondaryContacts: [],
  },
  {
    source: "Source 3",
    year: "2021",
    periodicity: "M11",
    vague: "03",
    surveyUnit: "000000001",
    identificationName: "la raison sociale",
    role: "Principal",
    secondaryContacts: [
      {
        identifier: "#MG01235",
        lastName: "Doe",
        firstName: "John",
      },
      {
        identifier: "#VG0123",
        lastName: "Nom",
        firstName: "Prenom",
      },
    ],
  },
];

export const UpdateContactRightsTable = () => {
  return (
    <Box>
      <TableContainer sx={{ py: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#EBEFF5" }}>
            <TableRow sx={{ borderBottom: `solid 1px ${theme.palette.text.hint}` }}>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  sx={{ typography: "titleSmall", py: 3 }}
                  align={column.align ?? "left"}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mockedData.map(data => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={`row-${data.source}`}
                  sx={{ borderBottom: `solid 1px ${theme.palette.text.hint}` }}
                >
                  {columns.map(column => {
                    const value = data[column.id as keyof typeof data];

                    if (column.id === "action") {
                      return (
                        <TableCell key={`action-${data.source}`}>
                          <UpdateContactRightsActions
                            role={data.role}
                            secondaryContacts={data.secondaryContacts}
                            source={data.source}
                          />
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={column.id}>
                        {typeof value === "string" && (value ?? "NO DATA")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
