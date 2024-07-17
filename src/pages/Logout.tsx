import { Stack, Typography, Box, Link } from "@mui/material";
import { Row } from "../ui/Row.tsx";
import { PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router-dom";

export function LogoutPage() {
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
          {"Vous avez été deconnecté,"}
        </Typography>
        <Row spacing={2}>
          <Typography variant="displaySmall" fontWeight={400} color="white">
            {"pour revenir sur "}
          </Typography>
          <Row typography="headlineMedium" gap={0.25} color="red.main" component="span">
            <Box component="span" color="black.main" fontWeight={600}>
              Platine
            </Box>
            Gestion
          </Row>
          ,
        </Row>
        <Typography variant="displaySmall" fontWeight={400} color="white" component={HomeLink}>
          {"cliquez ici"}
        </Typography>
      </Stack>
    </>
  );
}

const HomeLink = (props: PropsWithChildren) => {
  return <Link component={RouterLink} underline="none" to="/" {...props} />;
};
