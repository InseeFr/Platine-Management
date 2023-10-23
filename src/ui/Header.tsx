import { Stack, Typography, Box, IconButton } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { theme } from "../theme";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export function Header() {
  const { username } = useAuth();
  return (
    <Box
      sx={{
        background: "white",
        alignSelf: "stretch",
        alignItems: "center",
        display: "flex",
        height: "74px",
        px: 6,
        py: 1,
        boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.10)",
      }}
      className="Header"
    >
      <Box
        sx={{
          alignItems: "center",
          gap: "40px",
          display: "flex",
          py: 1.5,
        }}
        className="Frame5"
      >
        <img src="/logoInsee.png" alt="" width={47.73} height={50} />
        <Stack spacing={0.5} direction="row">
          <Typography variant="logo" color="primary" sx={{ wordWrap: "break-word" }}>
            Platine
          </Typography>
          <Typography
            variant="logo"
            color={theme.palette.inseeRed}
            component="span"
            sx={{ fontWeight: 500, wordWrap: "break-word" }}
          >
            Collecte
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "70vw",

          justifyContent: "flex-end",
          alignItems: "center",
          gap: 7.5,
          display: "inline-flex",
          px: 4,
          p: 2,
        }}
        className="Frame7"
      >
        <IconButton component={Link} to="/reglages">
          <SettingsOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
