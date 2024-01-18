import { Box, Typography } from "@mui/material";

export const FilterListBySelector = () => {
  return (
    <Box gap={"16px"} display={"flex"}>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "30px",
          letterSpacing: "0.15px",
          color: "#797676",
        }}
      >
        Trier par
      </Typography>
    </Box>
  );
};
