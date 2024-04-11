import { Stack, Typography } from "@mui/material";

export function UnauthorizedPage() {
  return (
    <>
      <Stack
        position="relative"
        sx={{
          background: "linear-gradient(270deg, #21005D 0%, #9A82DB 0%, #E12358 90%)",
        }}
        justifyContent="center"
        alignItems="center"
        minHeight={500}
        height="calc(100vh - 230px)"
      >
        <Typography variant="displaySmall" fontWeight={400} color="white">
          Vous n'avez pas les droits nécessaires pour accéder à Platine Gestion
        </Typography>
      </Stack>
    </>
  );
}
