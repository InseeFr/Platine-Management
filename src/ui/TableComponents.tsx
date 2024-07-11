import CircularProgress from "@mui/material/CircularProgress";
import TableCell from "@mui/material/TableCell/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export interface Column {
  id: string;
  label: string;
  minWidth?: string;
  align?: "center" | "left" | "right" | "inherit" | "justify";
}

export const TableHeader = ({ columns }: { columns: readonly Column[] }) => {
  return (
    <TableHead sx={{ backgroundColor: "#EBEFF5" }}>
      <TableRow>
        {columns.map(column => (
          <TableCell
            key={column.id}
            style={{ minWidth: column.minWidth }}
            sx={{ typography: "titleSmall", p: 2 }}
            align={column.align ?? "left"}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
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

type SurveysTableFooterProps = {
  count: number;
  rowsPerPage: number;
  page: number;
  onChangePage: (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const CustomTableFooter = ({
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

export const NoResultCell = ({ columnLength, text }: { columnLength: number; text: string }) => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={columnLength}>
        <Typography variant="titleSmall">{text}</Typography>
      </TableCell>
    </TableRow>
  );
};
