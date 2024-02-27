import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { IconButton, Menu } from "@mui/material";
import { useState } from "react";

export const collectStates = [
  { label: "Questionnaire papier réceptionné", value: "VALPAP" },
  { label: "Pli non distribué", value: "PND" },
  { label: "Hors champ de l’enquête", value: "HC" },
  { label: "Refus de réponse", value: "REFUS" },
  { label: "Déchet (incapacité de répondre, maladie, absence de longue durée…)", value: "DECHET" },
  { label: "Collecte initialisée", value: "INITLA" },
  { label: "Unité enquêtée relancée", value: "RELANCE" },
  { label: "Questionnaire validé sur internet", value: "VALINT" },
  { label: "Questionnaire internet partiellement complété", value: "PARTIELINT" },
];

const options = collectStates.filter(state =>
  ["VALPAP", "PND", "HC", "REFUS", "DECHET"].includes(state.value),
);

type Props = {
  onSelect: (value: string) => void;
};

export const CollectStateSelect = ({ onSelect }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    setAnchorEl(null);
    onSelect(value);
  };

  return (
    <Box component="div">
      <IconButton sx={{ color: "text.secondary" }} onClick={onClick} size="small">
        <AddIcon fontSize="small" />
      </IconButton>
      <Menu
        id="add-state-menu"
        aria-labelledby="add-state--button"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {options.map(o => (
          <MenuItem key={o.value} value={o.value} onClick={() => handleSelect(o.value)}>
            {o.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
