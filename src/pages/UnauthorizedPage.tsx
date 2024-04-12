import { Box, Stack, Typography } from "@mui/material";
import { Row } from "../ui/Row";

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
        <Row spacing={2}>
          <Typography variant="displaySmall" fontWeight={400} color="white">
            {"Vous n'êtes pas autoisé à accéder à "}
          </Typography>
          <Row typography="headlineMedium" gap={0.25} color="red.main" component="span">
            <Box component="span" color="black.main" fontWeight={600}>
              Platine
            </Box>
            Gestion
          </Row>
        </Row>
      </Stack>
    </>
  );
}
