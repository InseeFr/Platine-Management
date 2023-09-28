import { Box, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";

export function InfoBanner() {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const message =
    "Le CEI va tester la pose automatique de page de maintenance mardi 21 janvier et mercredi 1er février. Vous pourrez rencontrer de micro-coupures dans l’accès à l’application Pilotage durant ces deux derniers jours. Veuillez nous excuser pour le désagrément.";

  function handleClickOpen() {
    setDialogOpen(true);
  }

  return (
    <>
      <Box sx={{ px: 6, py: 1, color: "Surfaces.Secondary", backgroundColor: "#6750A4" }}>
        <Typography
          onClick={handleClickOpen}
          textAlign="center"
          fontFamily="Open Sans, sans-serif"
          fontWeight={700}
          fontSize={16}
        >
          {message.substring(0, 100)} ... voir plus
        </Typography>
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle sx={{ px: 3, py: 2 }} fontWeight="bold">
          Message important
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            sx={{ px: 8, pb: 2.5, textAlign: "justify" }}
            fontWeight={400}
            lineHeight="196.429%"
          >
            {message}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
