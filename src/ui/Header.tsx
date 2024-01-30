import { Box, IconButton, Link } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link as RouterLink } from "react-router-dom";
import { Row } from "./Row.tsx";
import { PropsWithChildren } from "react";
import { useUser } from "../hooks/useAuth.ts";

export function Header() {
  const { username } = useUser();
  return (
    <Row px={4} py={1} height={74} justifyContent="space-between" bgcolor="white">
      <Row gap={2.5} component={HomeLink}>
        <img src="/logoInsee.png" alt="" width={48} height={50} />
        <Row typography="headlineMedium" gap={0.25} color="red.main" component="span">
          <Box component="span" color="black.main" fontWeight={600}>
            Platine
          </Box>
          Collecte
        </Row>
      </Row>
      <Box>
        {username}
        <IconButton component={RouterLink} to="/reglages">
          <SettingsOutlinedIcon />
        </IconButton>
      </Box>
    </Row>
  );
}

const HomeLink = (props: PropsWithChildren) => {
  return <Link component={RouterLink} underline="none" to="/" {...props} />;
};
