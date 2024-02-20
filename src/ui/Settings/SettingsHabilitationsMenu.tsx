import { IconButton } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { APISchemas } from "../../types/api";

type Props = {
  user: APISchemas["UserDto"];
};

const options = [
  "Suppression des droits annuaire",
  "Suppression des droits Pilotage",
  "Modification du rôle dans Pilotage",
  "Ajout/suppression de sources dans Pilotage",
];

const ITEM_HEIGHT = 48;

export const SettingsHabilitationsMenu = ({ user }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            onClick={handleClose}
            sx={{
              lineHeight: "24px",
              fontSize: "16px",
              letterSpacing: "0.15px",
              fontWeight: 400,
              fontFamily: "Roboto",
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
