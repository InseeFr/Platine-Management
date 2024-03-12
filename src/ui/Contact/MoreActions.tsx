import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "../Link";

type Props = {
  surveyId?: string;
  surveyUnitId?: string;
  questioningUrl?: string;
};

export const MoreAction = ({ surveyId, surveyUnitId, questioningUrl }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component="div">
      <IconButton sx={{ color: "text.secondary" }} onClick={onClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="more-action-menu"
        aria-labelledby="more-action-button"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => navigate(`/survey-units/${surveyUnitId}`)}>
          Consulter la fiche “unité enquêtée”
        </MenuItem>
        <MenuItem onClick={() => navigate(`/surveys/${surveyId}`)}>
          Consulter la fiche “enquête”
        </MenuItem>
        <MenuItem disabled={questioningUrl === undefined}>
          <Link to={questioningUrl!} color="inherit" underline="none">
            Consulter le questionnaire
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};
