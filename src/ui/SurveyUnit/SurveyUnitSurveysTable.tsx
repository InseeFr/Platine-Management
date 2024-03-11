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
  TableSortLabel,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Row } from "../Row";
import { theme } from "../../theme";
import { Column } from "../Contact/AssociateSurveysTable";
import { LoadingCell, getCollectStateChipColor, style } from "../Contact/ContactSurveysTable";
import { collectStates } from "../Contact/CollectStateSelect";
import { APISchemas } from "../../types/api";

const columns: readonly Column[] = [
  { id: "sourceWording", label: "Source", minWidth: "200px" },
  { id: "year", label: "Millésime", minWidth: "115px" },
  { id: "campaign", label: "Campagne", minWidth: "250px" },
  { id: "partioningClosingDate", label: "Date fin enquête", minWidth: "175px" },
  { id: "lastEvent", label: "Etat de la collecte", minWidth: "150px" },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

type Props = {
  surveys?: APISchemas["SurveyUnitPartitioning"][];
};

export const SurveyUnitSurveysTable = (props: Props) => {
  const surveys = props.surveys ?? [];
  const isLoading = props.surveys === undefined;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = surveys.sort(getComparator(order, orderBy));

  return (
    <TableContainer>
      <Table aria-label="surveys table">
        <TableHeaderWithSort order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
          {visibleRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(survey => {
            return (
              <TableRow
                hover
                tabIndex={-1}
                key={`row-${survey.sourceWording}`}
                sx={{ borderBottom: `solid 1px ${theme.palette.text.hint}` }}
              >
                {columns.map(column => {
                  const value = survey[column.id as keyof typeof survey];

                  if (column.id === "campaign") {
                    return (
                      <TableCell key={column.id}>
                        {`${survey.campaignWording ?? ""} - ${survey.period ?? ""}`}
                      </TableCell>
                    );
                  }

                  if (column.id === "lastEvent") {
                    return (
                      <TableCell key={`state-${survey.sourceWording}`}>
                        <Row spacing={1}>
                          {value && (
                            <Chip
                              sx={{
                                typography: "titleSmall",
                              }}
                              label={collectStates.find(state => state.value === value)?.label}
                              color={getCollectStateChipColor(value as string)}
                            />
                          )}
                        </Row>
                      </TableCell>
                    );
                  }
                  if (column.id === "partioningClosingDate") {
                    return (
                      <TableCell key={column.id}>
                        {value && new Date(Date.parse(value as string)).toLocaleDateString()}
                      </TableCell>
                    );
                  }

                  return <TableCell key={column.id}>{value}</TableCell>;
                })}
              </TableRow>
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

type TableHeaderWithSortProps = {
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
};

const TableHeaderWithSort = ({ order, orderBy, onRequestSort }: TableHeaderWithSortProps) => {
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ backgroundColor: "#EBEFF5" }}>
      <TableRow sx={{ borderBottom: `solid 1px ${theme.palette.text.hint}` }}>
        {columns.map(column => (
          <TableCell
            key={column.id}
            style={{ minWidth: column.minWidth }}
            sx={{ typography: "titleSmall", py: 2 }}
            align={column.align ?? "left"}
            sortDirection={orderBy === column.id ? order : false}
          >
            {["year", "endDate", "campaign"].includes(column.id) ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              <>{column.label} </>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
