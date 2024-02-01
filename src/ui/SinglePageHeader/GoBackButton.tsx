import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

export const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(-1)}>
      <ArrowBackIosNewIcon sx={{ color: "black.main" }} />
    </IconButton>
  );
};
