import {
  Card,
  Stack,
  Divider,
  Typography,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  CircularProgress,
  Button,
  TableFooter,
  TablePagination,
  InputAdornment,
  CardContent,
} from "@mui/material";
import { useInfiniteFetchQuery } from "../../hooks/useFetchQuery";
import { SettingsHabilitationsMenu } from "./SettingsHabilitationsMenu";
import { RoleChip } from "./RoleChip";
import { Row } from "../Row";
import { ChangeEvent, useEffect, useState } from "react";
import { APISchemas } from "../../types/api";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { format } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";

const endpoint = "/api/users" as const;

interface Column {
  id: string;
  label: string;
  minWidth?: string;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "Idep", minWidth: "95px" },
  { id: "name", label: "Nom", minWidth: "95px" },
  { id: "firstName", label: "Prénom", minWidth: "95px" },
  { id: "Organisation", label: "Organisation", minWidth: "150px" },
  { id: "role", label: "Rôle", minWidth: "120px" },
  { id: "pilotRights", label: "Droits Pilotage", minWidth: "50px" },
  { id: "ldapRights", label: "Droits Annuaire", minWidth: "50px" },
  { id: "accreditedSources", label: "Source", minWidth: "100px" },
  { id: "creation", label: "Date de création", minWidth: "120px" },
  { id: "actions", label: "Actions", minWidth: "80px" },
];

export const SettingsHabilitationsCard = () => {
  const {
    results: users,
    /*   hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage, */
  } = useInfiniteFetchQuery(endpoint);
  const [searchList, setSearchList] = useState<Array<APISchemas["UserDto"]>>([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [pageNumber, setPageNumber] = useState<number>(0);

  useEffect(() => {
    setSearchList(users);
  }, [users]);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  function filterValues(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const filteredList = users.filter(u =>
      e.target.value.length > 0
        ? u.identifier.toLowerCase().includes(e.target.value.toLowerCase()) ||
          u.name?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          u.role?.toLowerCase().includes(e.target.value.toLowerCase())
        : u,
    );
    setSearchList(filteredList);
    setPageNumber(0);
  }
  if (!users) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={4}>
          <Typography variant="titleMedium" fontSize={"20px"} fontWeight={700}>
            {" "}
            {"Gestion des habilitations des utilisateurs INSEE"}
          </Typography>
          <Divider variant="fullWidth" sx={{ borderWidth: 2 }} />
          <Row justifyContent={"space-between"}>
            <Row spacing={2}>
              <TextField
                label="Rechercher dans le tableau"
                placeholder="Rechercher par nom, idep, rôle..."
                size="small"
                sx={{ width: "300px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                onChange={e => filterValues(e)}
              />
            </Row>

            <Button
              variant="contained"
              sx={{ typography: "bodyLarge" }}
              size={"large"}
              startIcon={<AddCircleOutlineOutlinedIcon />}
            >
              Ajouter un utilisateur
            </Button>
          </Row>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ background: "#EBEFF5" }}>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      align="center"
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                      sx={{ typography: "titleSmall", py: 3, fontWeight: 700 }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchList.slice(rowsPerPage * pageNumber, rowsPerPage * (pageNumber + 1)).map(user => (
                  <TableRow key={user.identifier}>
                    <TableCell align="center">{user.identifier}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center"> {user.firstName}</TableCell>
                    <TableCell align="center">{user.organization}</TableCell>
                    <TableCell align="center">
                      {user.role ? <RoleChip role={user.role.toLowerCase()} /> : null}
                    </TableCell>
                    <TableCell align="center">{"not provided"}</TableCell>
                    <TableCell align="center">{"not provided"}</TableCell>
                    <TableCell align="center">{user.accreditedSources?.join()}</TableCell>
                    <TableCell align="center">
                      {user.creationDate ? `Le ${format(user.creationDate, "dd/MM/yyyy")}` : ""}{" "}
                      {`par 
                    ${user.creationAuthor}`}
                    </TableCell>
                    <TableCell align="center">
                      <SettingsHabilitationsMenu user={user} />
                    </TableCell>
                  </TableRow>
                ))}
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
                    count={searchList.length}
                    rowsPerPage={rowsPerPage}
                    page={pageNumber}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Stack>
      </CardContent>
    </Card>
  );
};
