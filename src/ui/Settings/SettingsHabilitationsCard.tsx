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
  IconButton,
  TextField,
  CircularProgress,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
} from "@mui/material";
import { useInfiniteFetchQuery } from "../../hooks/useFetchQuery";
import { SettingsHabilitationsMenu } from "./SettingsHabilitationsMenu";
import { RoleChip } from "./RoleChip";
import { Row } from "../Row";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChangeEvent, useState } from "react";
import { APISchemas } from "../../types/api";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const endpoint = "/api/users" as const;

const roles = ["administrateur", "responsable", "gestionnaire", "assistance"];

export const SettingsHabilitationsCard = () => {
  const {
    results: users,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteFetchQuery(endpoint);
  const [searchList, setSearchList] = useState<Array<APISchemas["UserDto"]>>([]);

  function filterValues(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const filteredList = users.filter(u =>
      e.target.value.length > 0 ? u.identifier.includes(e.target.value) : u,
    );

    console.log(filteredList);
    setSearchList(filteredList);
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
            <Select
              size="medium"
              displayEmpty
              sx={{ width: "200px" }}
              input={<OutlinedInput size="small" />}
            >
              {roles.map(r => (
                <MenuItem key={r} value={r}>
                  <RoleChip role={r.toLowerCase()} />
                </MenuItem>
              ))}
            </Select>
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
                <TableCell align="center">Droits annuaire</TableCell>
                <TableCell align="center">Source</TableCell>
                <TableCell align="center">Unité enquêtée</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchList.length} &&
              {searchList.map(user => (
                <TableRow key={user.identifier}>
                  <TableCell align="center">{user.identifier}</TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                  <TableCell align="center"> {"not provided"}</TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                  <TableCell align="center">
                    {user.role ? <RoleChip role={user.role.toLowerCase()} /> : null}
                  </TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                  <TableCell align="center">
                    <SettingsHabilitationsMenu user={user} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Row justifyContent={"right"}>
          <Typography>
            {}
            {"sur entités affichées"}
          </Typography>
          <IconButton
            sx={{ bgcolor: "background.default" }}
            disabled={!hasPreviousPage}
            onClick={() => fetchPreviousPage()}
          >
            <ChevronLeftIcon sx={{ color: "black.main" }} />
          </IconButton>
          <IconButton
            sx={{ bgcolor: "background.default" }}
            disabled={!hasNextPage}
            onClick={() => fetchNextPage()}
          >
            <ChevronRightIcon sx={{ color: "black.main" }} />
          </IconButton>
        </Row>
      </Stack>
    </Card>
  );
};
