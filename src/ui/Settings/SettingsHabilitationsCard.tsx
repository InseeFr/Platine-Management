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
} from "@mui/material";
import { useInfiniteFetchQuery } from "../../hooks/useFetchQuery";

const endpoint = "/api/users" as const;

export const SettingsHabilitationsCard = () => {
  const { results: users, hasNextPage, fetchNextPage } = useInfiniteFetchQuery(endpoint);
  return (
    <Card sx={{ px: 6, py: 3 }} elevation={2}>
      <Stack spacing={4}>
        <Typography variant="titleMedium" fontSize={"20px"} fontWeight={700}>
          {" "}
          {"Gestion des habilitations des utilisateurs INSEE"}
        </Typography>
        <Divider variant="fullWidth" sx={{ borderWidth: 2 }} />
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
              {users?.map(user => (
                <TableRow key={user.identifier}>
                  <TableCell align="center">{user.identifier}</TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                  <TableCell align="center"> {"not provided"}</TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                  <TableCell align="center">{"not provided"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Card>
  );
};
