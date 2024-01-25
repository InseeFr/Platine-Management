import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

export const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{
        borderRadius: "50%",
        backgroundColor: "#F5F7FA",
        minWidth: 0,
        width: "48px",
        height: "48px",
      }}
      variant={"contained"}
      onClick={() => navigate(-1)}
    >
      <ArrowBackIosNewIcon sx={{ color: "black.main" }} />
    </Button>
  );
};
