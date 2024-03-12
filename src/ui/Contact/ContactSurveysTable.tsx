import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { APISchemas } from "../../types/api";
import { Column, TableHeader } from "./AssociateSurveysTable";
import { ContactSurveysTableRow } from "./ContactSurveysTableRow";

const style = {
  root: {
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
  },
};

export const columns: readonly Column[] = [
  { id: "lastEvent", label: "Etat de la collecte", minWidth: "330px" },
  { id: "sourceWording", label: "Nom enquête", minWidth: "95px" },
  { id: "year", label: "Millésime", minWidth: "95px" },
  { id: "period", label: "Campagne", minWidth: "120px" },
  { id: "partioningClosingDate", label: "Date fin enquête", minWidth: "120px" },
  { id: "surveyUnitId", label: "Unité enquêtée", minWidth: "150px" },
  { id: "identificationName", label: "Raison sociale", minWidth: "190px" },
  { id: "main", label: "Rôle", minWidth: "120px" },
  { id: "actions", label: "Actions", minWidth: "100px" },
];

type Props = {
  surveys?: APISchemas["AccreditationDetailDto"][];
  onSelectState: () => void;
};

export const ContactSurveysTable = (props: Props) => {
  const surveys = props.surveys ?? [];

  const isLoading = props.surveys === undefined;
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
        <TableHeader columns={columns} />
        <TableBody>
          {surveys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(survey => {
            return (
              <ContactSurveysTableRow
                survey={survey}
                key={`survey-${survey.partition}-${survey.identificationName}`}
                onSelectState={props.onSelectState}
              />
            );
          })}
          {isLoading && <LoadingCell columnLength={columns.length} />}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              sx={style.root}
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

export const LoadingCell = ({ columnLength }: { columnLength: number }) => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={columnLength}>
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
};
