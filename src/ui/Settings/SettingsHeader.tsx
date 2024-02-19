import { Stack, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Row } from "../Row";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const SettingsHeader = () => {
  const navigate = useNavigate();

  return (
    <Stack>
      <Row spacing={5} px={6} py={2} bgcolor={"white"}>
        <IconButton sx={{ bgcolor: "background.default" }} onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon sx={{ color: "black.main" }} />
        </IconButton>
        <Row spacing={2}>
          <SettingsOutlinedIcon fontSize="tabTitle" />
          <Typography component={"span"} fontWeight={700} fontSize={"20px"} color={"text.primary"}>
            {"Réglages"}
          </Typography>
        </Row>
      </Row>
    </Stack>
  );
};
