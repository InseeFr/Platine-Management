import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { theme } from "../theme";
import { ElementType } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  label: string;
  IconComponent: ElementType;
  link: string;
  isActive: boolean;
};

export const NavigationListItem = ({ open, IconComponent, label, link, isActive }: Props) => {
  const navigate = useNavigate();
  return (
    <ListItem
      disablePadding
      sx={{ display: "block", backgroundColor: isActive ? "blue.main" : theme.palette.background.main }}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
        onClick={() => navigate(link)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 1 : "auto",
            justifyContent: "center",
            color: theme.palette.text.light,
          }}
        >
          <IconComponent fontSize="navIcon" />
        </ListItemIcon>
        <ListItemText
          primary={label}
          sx={{ opacity: open ? 1 : 0, ".MuiTypography-root": { ...theme.typography.titleSmall } }}
        />
      </ListItemButton>
    </ListItem>
  );
};