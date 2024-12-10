import { Stack, Typography, Box, Card, Button } from "@mui/material";
import { Link } from "../ui/Link.tsx";
import { Row } from "../ui/Row.tsx";

export function LogoutPage() {
  return (
    <Box
      sx={{
        width: "90vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Card sx={{ p: 5, width: "500px" }} elevation={2}>
        <Stack gap={5} alignItems={"center"}>
          <Row typography="headlineLarge" gap={0.5} color="red.main" component="span">
            <Box component="span" color="black.main" fontWeight={600}>
              Platine
            </Box>
            Gestion
          </Row>
          <Typography variant="headlineLarge">Vous avez été déconnecté.</Typography>
          <Button variant="contained" sx={{ py: 1 }} component={Link} to={"/"}>
            Se reconnecter
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
