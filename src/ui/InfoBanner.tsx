import { Box, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { Row } from "./Row.tsx";

export function InfoBanner() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const message =
    "MAINTENANCE : Le CEI va tester la pose automatique de page de maintenance mardi 21 janvier et mercredi 1er février. Vous pourrez rencontrer de micro-coupures dans l’accès à l’application Pilotage durant ces deux derniers jours. Veuillez nous excuser pour le désagrément.";

  function handleBannerClick() {
    setDialogOpen(true);
  }

  return (
    <>
      <Row
        component="button"
        width="100%"
        py={1.25}
        bgcolor="primary.main"
        color="white"
        textAlign="center"
        justifyContent="center"
        gap={0.5}
        typography="titleMedium"
        onClick={handleBannerClick}
      >
        {message.substring(0, 100)}...
        <Box sx={{ textDecoration: "underline" }}>voir plus</Box>
      </Row>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Message important</DialogTitle>
        <DialogContent sx={{ width: 440 }}>
          <Typography variant="bodyMedium" color="light.main">
            {message}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
