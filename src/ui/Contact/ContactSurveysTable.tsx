import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { APISchemas } from "../../types/api";
import { Column, TableHeader } from "./AssociateSurveysTable";
import { ContactSurveysTableRow } from "./ContactSurveysTableRow";

export const style = {
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
  { id: "lastEvent", label: "Etat de la collecte", minWidth: "240px" },
  { id: "sourceWording", label: "Nom enquête", minWidth: "95px" },
  { id: "year", label: "Millésime", minWidth: "95px" },
  { id: "period", label: "Campagne", minWidth: "100px" },
  { id: "partioningClosingDate", label: "Date fin enquête", minWidth: "100px" },
  { id: "surveyUnitId", label: "Unité enquêtée", minWidth: "140px" },
  { id: "identificationName", label: "Raison sociale", minWidth: "130px" },
  { id: "main", label: "Rôle", minWidth: "100px" },
  { id: "actions", label: "Accès au site miroir", minWidth: "90px", align: "center" },
];

type Props = {
  surveys?: APISchemas["AccreditationDetailDto"][];
  onSelectState: () => void;
  isLoading: boolean;
};

export const ContactSurveysTable = (props: Props) => {
  const surveys = props.surveys ?? [];

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
          {surveys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((survey, index) => {
            return (
              <ContactSurveysTableRow
                survey={survey}
                key={`survey-${survey.partition}-${survey.identificationName}-${index}`}
                onSelectState={props.onSelectState}
              />
            );
          })}
          {props.isLoading && <LoadingCell columnLength={columns.length} />}
          {!props.isLoading && surveys.length === 0 && <NoResultCell columnLength={columns.length} />}
        </TableBody>
        <SurveysTableFooter
          count={surveys.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
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

type SurveysTableFooterProps = {
  count: number;
  rowsPerPage: number;
  page: number;
  onChangePage: (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const SurveysTableFooter = ({
  count,
  rowsPerPage,
  page,
  onChangePage,
  onChangeRowsPerPage,
}: SurveysTableFooterProps) => {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          sx={style.root}
          rowsPerPageOptions={[10, 20, 50]}
          labelRowsPerPage={"Lignes par page :"}
          labelDisplayedRows={page =>
            `${page.from}-${page.to === -1 ? page.count : page.to} sur ${page.count} entités affichées`
          }
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </TableRow>
    </TableFooter>
  );
};

export const NoResultCell = ({ columnLength }: { columnLength: number }) => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={columnLength}>
        <Typography variant="titleSmall">Aucun résultat</Typography>
      </TableCell>
    </TableRow>
  );
};
