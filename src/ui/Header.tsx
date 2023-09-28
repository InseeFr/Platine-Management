import { Stack, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { theme } from "../theme";

export function Header() {
  return (
    <>
      <Stack
        direction="row"
        sx={{ px: 6, py: 1, backgroundColor: "Surfaces.Secondary" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack spacing={5} direction="row" alignItems="center">
          <img src="/logoInsee.png" alt="" width={47} height={50} />
          <Stack spacing={0.5} direction="row">
            <Typography variant="logo" color="primary">
              Platine
            </Typography>
            <Typography variant="logo" color={theme.palette.inseeRed} component="span">
              Collecte
            </Typography>
          </Stack>
        </Stack>
        <SettingsOutlinedIcon />
      </Stack>
    </>
  );
}
