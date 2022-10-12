import { Box, Card, CardContent, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import { formatNumber } from "core/utils/numberUtils";

export const HomeChip = ({ nb, label }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <>
          <Box alignItems="left">
            <BarChartIcon color="primary" fontSize="large"></BarChartIcon>
          </Box>
          <Box>
            <Typography variant="h4">{formatNumber(nb)}</Typography>
            <Typography variant="h6">{label}</Typography>
          </Box>
        </>
      </CardContent>
    </Card>
  );
};
