import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Button, Menu } from "@mui/material";
import { useState } from "react";

export const collectStates = [
  { label: "Questionnaire papier réceptionné", value: "VALPAP" },
  { label: "Pli non distribué", value: "PND" },
  { label: "Hors champ de l’enquête", value: "HC" },
  { label: "Refus de réponse", value: "REFUSAL" },
  { label: "Déchet (incapacité de répondre, maladie, absence de longue durée…)", value: "WASTE" },
  { label: "Collecte initialisée", value: "INITLA" },
  { label: "Unité enquêtée relancée", value: "RELANCE" },
  { label: "Questionnaire validé sur internet", value: "VALINT" },
  { label: "Questionnaire internet partiellement complété", value: "PARTIELINT" },
];

const options = collectStates.filter(state =>
  ["VALPAP", "PND", "HC", "REFUSAL", "WASTE"].includes(state.value),
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
      <Button variant="outlined" onClick={onClick}>
        Ajouter un état
      </Button>
      <Menu
        id="add-state-menu"
        aria-labelledby="add-state--button"
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
        {options.map(o => (
          <MenuItem key={o.value} value={o.value} onClick={() => handleSelect(o.value)}>
            {o.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
