import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";

export const MoreAction = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  const onRedirect = () => {
    setAnchorEl(null);
    //TODO redirect with survey unit or survey url
  };

  return (
    <Box component="div">
      <IconButton sx={{ color: "text.secondary" }} aria-label="delete" onClick={onClick}>
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
        <MenuItem onClick={onRedirect} sx={{ typography: "titleMedium", fontWeight: "400" }}>
          Consulter la fiche “unité enquêtée”
        </MenuItem>
        <MenuItem onClick={onRedirect}>Consulter la fiche “enquête”</MenuItem>
      </Menu>
    </Box>
  );
};
