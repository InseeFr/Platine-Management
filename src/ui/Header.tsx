import { Box, IconButton, Link, Stack, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link as RouterLink } from "react-router-dom";
import { Row } from "./Row.tsx";
import { PropsWithChildren } from "react";
import { useUser, useLogout } from "../hooks/useAuth.ts";
import packageInfo from "../../package.json";
import { useHasPermission } from "../hooks/usePermissions.ts";

export function Header() {
  const { preferred_username } = useUser();
  const logout = useLogout();
  const activeSettings = useHasPermission("ACCESS_SETTINGS");

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
      <Box>
        {preferred_username}
        {activeSettings && (
          <IconButton component={RouterLink} to="/reglages">
            <SettingsOutlinedIcon />
          </IconButton>
        )}
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
      </Box>
    </Row>
  );
}

const HomeLink = (props: PropsWithChildren) => {
  return <Link component={RouterLink} underline="none" to="/" {...props} />;
};
