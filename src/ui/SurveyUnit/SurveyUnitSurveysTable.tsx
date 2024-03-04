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
import { getCollectStateChipColor, style } from "../Contact/ContactSurveysTable";
import { collectStates } from "../Contact/CollectStateSelect";

const columns: readonly Column[] = [
  { id: "shortWording", label: "Source", minWidth: "200px" },
  { id: "year", label: "Millésime", minWidth: "115px" },
  { id: "campaign", label: "Campagne", minWidth: "250px" },
  { id: "endDate", label: "Date fin enquête", minWidth: "175px" },
  { id: "lastEvent", label: "Etat de la collecte", minWidth: "150px" },
];

// TODO: remove mocks
const surveysMock = [
  {
    shortWording: "Mock 1",
    campaign: "MOCK 1 Fréquentation dans les hébergements collectifs touristiques janvier 2021",
    year: "2018",
    endDate: "2023-03-02T13:17:32.813Z",
    lastEvent: "PARTIELINT",
  },
  {
    shortWording: "Mock2",
    campaign: "MOCK 2 Fréquentation dans les hébergements collectifs touristiques janvier 2021",
    year: "2017",
    endDate: "2022-07-08T13:17:32.813Z",
    lastEvent: "PARTIELINT",
  },
  {
    shortWording: "Mock3",
    campaign: "MOCK  Fréquentation dans les hébergements collectifs touristiques janvier 2021",
    year: "2019",
    endDate: "2023-03-01T13:17:32.813Z",
    lastEvent: "PARTIELINT",
  },
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

export const SurveyUnitSurveysTable = () => {
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

  const visibleRows = useMemo(() => surveysMock.sort(getComparator(order, orderBy)), [order, orderBy]);

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
                key={`row-${survey.campaign}`}
                sx={{ borderBottom: `solid 1px ${theme.palette.text.hint}` }}
              >
                {columns.map(column => {
                  const value = survey[column.id as keyof typeof survey];

                  if (column.id === "lastEvent") {
                    return (
                      <TableCell key={`state-${survey.campaign}`}>
                        <Row spacing={1}>
                          <Chip
                            sx={{
                              typography: "titleSmall",
                            }}
                            label={collectStates.find(state => state.value === value)?.label}
                            color={getCollectStateChipColor(value)}
                          />
                        </Row>
                      </TableCell>
                    );
                  }
                  if (column.id === "endDate") {
                    return (
                      <TableCell key={column.id}>
                        {new Date(Date.parse(value)).toLocaleDateString()}
                      </TableCell>
                    );
                  }

                  return <TableCell key={column.id}>{value ?? "NO DATA"}</TableCell>;
                })}
              </TableRow>
            );
          })}
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
              count={surveysMock.length}
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
