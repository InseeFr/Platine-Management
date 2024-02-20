import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { MoreAction } from "./MoreActions";
import { APISchemas } from "../../types/api";

interface Column {
  id: string;
  label: string;
  minWidth?: string;
  format?: (value: number) => string;
}

// TODO: use real ids (state, endDate, surveyUnit, role)
const columns: readonly Column[] = [
  { id: "state", label: "Etat de la collecte", minWidth: "330px" },
  { id: "sourceWording", label: "Nom enquête", minWidth: "95px" },
  { id: "year", label: "Millésime", minWidth: "95px" },
  { id: "period", label: "Campagne", minWidth: "120px" },
  { id: "endDate", label: "Date fin enquête", minWidth: "120px" },
  { id: "surveyUnit", label: "Unité enquêtée", minWidth: "150px" },
  { id: "identificationName", label: "Raison sociale", minWidth: "190px" },
  { id: "role", label: "Rôle", minWidth: "120px" },
  { id: "actions", label: "Actions", minWidth: "100px" },
];

type Props = {
  surveys: APISchemas["AccreditationDetailDto"][];
};

export const ContactSurveysTable = ({ surveys }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          {surveys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(survey => {
            return (
              <TableRow hover tabIndex={-1} key={`row-${survey.partition}`}>
                {columns.map(column => {
                  const value = survey[column.id];

                  if (column.id === "state") {
                    return (
                      <TableCell key={`state-${survey.partition}`}>
                        <CollectStateChip state={"NO DATA"} />
                      </TableCell>
                    );
                  }

                  if (column.id === "actions") {
                    return (
                      <TableCell key={`action-${survey.partition}`} align="center">
                        {/* add id when id is in api */}
                        <MoreAction surveyId={survey.sourceId} surveyUnitId={"id"} />
                      </TableCell>
                    );
                  }

                  if (value === undefined) {
                    return <TableCell key={column.id}>NO DATA</TableCell>;
                  }

                  return <TableCell key={column.id}>{value}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              sx={{
                ".MuiTablePagination-displayedRows": {
                  typography: "bodySmall",
                },
                ".MuiTablePagination-input": {
                  typography: "bodySmall",
                },
                ".MuiTablePagination-selectLabel": {
                  typography: "bodySmall",
                  color: "text.tertiary",
                },
              }}
              rowsPerPageOptions={[10, 20, 50]}
              labelRowsPerPage={"Lignes par page :"}
              labelDisplayedRows={page =>
                `${page.from}-${page.to === -1 ? page.count : page.to} sur ${
                  page.count
                } entités affichées`
              }
              count={surveys.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
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
