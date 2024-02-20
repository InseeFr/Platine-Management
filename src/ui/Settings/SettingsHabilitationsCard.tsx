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
} from "@mui/material";
import { useInfiniteFetchQuery } from "../../hooks/useFetchQuery";
import { SettingsHabilitationsMenu } from "./SettingsHabilitationsMenu";
import { RoleChip } from "./RoleChip";
import { Row } from "../Row";
import { ChangeEvent, useEffect, useState } from "react";
import { APISchemas } from "../../types/api";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { format } from "date-fns";

const endpoint = "/api/users" as const;

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
    <Card sx={{ px: 6, py: 3 }} elevation={2}>
      <Stack spacing={4}>
        <Typography variant="titleMedium" fontSize={"20px"} fontWeight={700}>
          {" "}
          {"Gestion des habilitations des utilisateurs INSEE"}
        </Typography>
        <Divider variant="fullWidth" sx={{ borderWidth: 2 }} />
        <Row justifyContent={"space-between"}>
          <Row spacing={2}>
            <TextField label="Rechercher dans le tableau" onChange={e => filterValues(e)} />
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
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Idep
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Nom
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Prénom
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Organisation
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Rôle
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Droits Pilotage
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Droits annuaire
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Source
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Unité enquêtée
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Actions
                </TableCell>
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
    </Card>
  );
};
