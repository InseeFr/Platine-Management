import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { theme } from "../../theme";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import TableFooter from "@mui/material/TableFooter";
import { LoadingCell } from "./ContactSurveysTable";

interface Column {
  id: string;
  label: string;
  minWidth?: string;
  align?: "center" | "left" | "right" | "inherit" | "justify";
}

// TODO: use real ids
const columns: readonly Column[] = [
  { id: "id", label: "Compte à associer", minWidth: "175px" },
  { id: "campaign", label: "Campagne", minWidth: "200px" },
  { id: "idSu", label: "Unité enquêtée", minWidth: "155px" },
  { id: "role", label: "Rôle contact", minWidth: "155px" },
  { id: "action", label: "Associer", minWidth: "150px", align: "center" },
];

// TODO: remove mocks
const surveysMock = [
  {
    id: "LIL7665",
    campaign: "MOCK 1 Fréquentation dans les hébergements collectifs touristiques janvier 2021",
    idSu: "398387085",
    role: "Principal",
  },
  {
    id: "BIL7452",
    campaign: "MOCK 2 Annuelle de Production (EAP) 2022",
    idSu: "398387085",
    role: "Secondaire",
  },
];
export const AssociateSurveysTable = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // const isLoading = surveys === undefined;
  const isLoading = false;

  const onChange = (id: string) => {
    selectedIds.includes(id)
      ? setSelectedIds(selectedIds.filter(s => s !== id))
      : setSelectedIds([...selectedIds, id]);
  };

  const onClick = () => {
    // update contact
    console.log(selectedIds);
  };
  return (
    <Box>
      <TableContainer sx={{ py: 3 }}>
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
            {surveysMock.map(survey => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={`row-${survey.id}`}
                  sx={{ borderBottom: `solid 1px ${theme.palette.text.hint}` }}
                >
                  {columns.map(column => {
                    const value = survey[column.id as keyof typeof survey];

                    if (column.id === "action") {
                      return (
                        <TableCell key={`action-${survey.id}`} align="center">
                          <Checkbox
                            aria-label={`checkbox-${survey.id}`}
                            onChange={() => onChange(survey.id)}
                          />
                        </TableCell>
                      );
                    }

                    if (column.id === "role") {
                      return (
                        <TableCell key={`role-${survey.id}`} sx={{ fontWeight: 600 }}>
                          {value}
                        </TableCell>
                      );
                    }

                    return <TableCell key={column.id}>{value ?? "NO DATA"}</TableCell>;
                  })}
                </TableRow>
              );
            })}
            {isLoading && <LoadingCell columnLength={columns.length} />}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="right" colSpan={columns.length} sx={{ py: 4 }}>
                <Button variant="contained" disabled={selectedIds.length === 0} onClick={onClick}>
                  Associer
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};
