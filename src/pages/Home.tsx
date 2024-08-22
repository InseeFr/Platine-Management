import { Alert, Stack, Typography } from "@mui/material";
import { useMaybeUser } from "../hooks/useAuth.ts";

export const Home = () => {
  const user = useMaybeUser();

  return (
    <Stack gap={4} p={4}>
      <Typography variant="headlineLarge">{`Bonjour ${user?.given_name} ${user?.family_name} !`}</Typography>
      <Alert severity="info">
        MAINTENANCE : le CEI va tester la pose automatique de page de maintenance mardi 21 janvier et
        mercredi 1er février.
      </Alert>
    </Stack>
  );
};
