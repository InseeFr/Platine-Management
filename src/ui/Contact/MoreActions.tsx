import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  surveyId?: string;
  surveyUnitId?: string;
};

export const MoreAction = ({ surveyId, surveyUnitId }: Props) => {
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
        {/* Add url */}
        <MenuItem onClick={() => navigate(`/`)}>Consulter le questionnaire</MenuItem>
      </Menu>
    </Box>
  );
};
