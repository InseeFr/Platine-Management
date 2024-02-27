import { Box, IconButton, Link, Stack, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link as RouterLink } from "react-router-dom";
import { Row } from "./Row.tsx";
import { PropsWithChildren } from "react";
import { useUser, useLogout } from "../hooks/useAuth.ts";
import packageInfo from "../../package.json";

export function Header() {
  const { decodedToken, isAdminLdap, isUserLdap } = useUser();
  const logout = useLogout();

  return (
    <Row px={4} py={1} height={74} justifyContent="space-between" bgcolor="white">
      <Row gap={2.5} component={HomeLink}>
        <img src="/logoInsee.png" alt="logo insee" width={48} height={50} />
        <Stack>
          <Row typography="headlineMedium" gap={0.25} color="red.main" component="span">
            <Box component="span" color="black.main" fontWeight={600}>
              Platine
            </Box>
            Gestion
          </Row>
          <Typography variant="bodySmall" color="black.main">
            v{packageInfo.version}
          </Typography>
        </Stack>
      </Row>

      <Row spacing={4}>
        <Stack>
          <Typography variant={"bodyMedium"}>
            Bienvenue, {decodedToken.preferred_username.toUpperCase()}
          </Typography>
          <Typography variant={"bodyMedium"}>
            {isAdminLdap
              ? "Vous avez le profil Administrateur"
              : isUserLdap
              ? "Vous avez le profil Utilisateur"
              : "Vous n'avez aucune habilitation annuaire"}
          </Typography>
        </Stack>
        <IconButton component={RouterLink} to="/settings">
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            logout({
              redirectTo: "specific url",
              url: "",
            })
          }
        >
          <ExitToAppIcon />
        </IconButton>
      </Row>
    </Row>
  );
}

const HomeLink = (props: PropsWithChildren) => {
  return <Link component={RouterLink} underline="none" to="/" {...props} />;
};
