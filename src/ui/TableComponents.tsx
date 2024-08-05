import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { FormEventHandler } from "react";
import { theme } from "../theme.tsx";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

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
    padding: "8px 0 !important",
    ".MuiTablePagination-input": {
      borderRadius: "16px",
    },
    ".MuiTablePagination-displayedRows": {
      typography: "bodySmall",
    },
    ".MuiIconButton-root": {
      color: theme.palette.primary.main,
    },
    ".Mui-disabled": {
      color: theme.palette.action.disabled,
    },
  },
};

const CustomPageSizeSelector = ({ value, onChange }: any) => {
  return (
    <FormControl sx={{ width: "160px" }} variant="filled">
      <InputLabel id={"selectPaginationLabel"}>{"Lignes par page"}</InputLabel>
      <Select
        variant="filled"
        value={value}
        onChange={onChange}
        fullWidth
        disableUnderline
        IconComponent={props => <ExpandMoreOutlinedIcon {...props} sx={{ color: "text.primary" }} />}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <MenuItem key={pageSize} value={pageSize}>
            {pageSize}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

type CustomTableFooterProps = {
  count: number;
  rowsPerPage: number;
  page: number;
  labelDisplayedRows: string;
  onChangePage: (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const CustomTableFooter = ({
  count,
  rowsPerPage,
  page,
  labelDisplayedRows,
  onChangePage,
  onChangeRowsPerPage,
}: CustomTableFooterProps) => {
  return (
    <TableFooter sx={{ backgroundColor: "#EBEFF5" }}>
      <TableRow>
        <TablePagination
          sx={style.root}
          count={count}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage=""
          labelDisplayedRows={page =>
            `${page.from}-${page.to === -1 ? page.count : page.to} sur ${
              page.count
            } ${labelDisplayedRows} `
          }
          page={page}
          slotProps={{
            select: {
              inputComponent: CustomPageSizeSelector,
            },
            actions: {
              nextButtonIcon: {
                fontSize: "navigateIcon",
              },
              previousButtonIcon: {
                fontSize: "navigateIcon",
              },
            },
          }}
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

export const EmptyState = ({
  isFiltered,
  onReset,
  text,
}: {
  isFiltered: boolean;
  onReset?: FormEventHandler;
  text: string;
}) => {
  return (
    <Card elevation={2}>
      <Stack sx={{ justifyContent: "center", alignItems: "center", gap: 2, height: "30vh" }}>
        <Typography variant="titleSmall" color={theme.palette.text.tertiary}>
          {text}
        </Typography>
        {isFiltered && (
          <Button variant="outlined" sx={{ width: "fit-content" }} onClick={onReset}>
            Effacer les filtres
          </Button>
        )}
      </Stack>
    </Card>
  );
};
