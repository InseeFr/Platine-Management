import { useLogout } from "../hooks/useAuth.ts";
import { useHasPermission } from "../hooks/usePermissions.ts";
import { theme } from "../theme.tsx";
import * as React from "react";
import { styled, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import { NavigationListItem } from "./NavigationListItem.tsx";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Row } from "./Row.tsx";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";

const drawerWidth = 220;

const openedMixin = (): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 16px 8px 8px",
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== "open" })(({ open }) => ({
  ".MuiDrawer-paper": {
    backgroundColor: theme.palette.background.main,
    color: theme.palette.text.light,
  },
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(),
    "& .MuiDrawer-paper": openedMixin(),
  }),
  ...(!open && {
    ...closedMixin(),
    "& .MuiDrawer-paper": closedMixin(),
  }),
}));

export const NavigationDrawer = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const logout = useLogout();
  const activeSettings = useHasPermission("ACCESS_SETTINGS");

  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {open && (
          <Typography variant="titleMedium" sx={{ pl: "16px" }}>
            Platine{" "}
            <Box component="span" color="red.main">
              Gestion
            </Box>
          </Typography>
        )}
        <IconButton onClick={handleDrawer}>
          {open ? (
            <ChevronLeftIcon fontSize="large" sx={{ color: theme.palette.text.light }} />
          ) : (
            <ChevronRightIcon fontSize="large" sx={{ color: theme.palette.text.light }} />
          )}
        </IconButton>
      </DrawerHeader>
      <Stack sx={{ justifyContent: "space-between", pb: 2, height: "100vh" }}>
        <List sx={{ py: 2 }}>
          <NavigationListItem
            open={open}
            label={"Accueil"}
            IconComponent={HomeOutlinedIcon}
            link={"/"}
            isActive={currentPath === "/"}
          />
          <NavigationListItem
            open={open}
            label={"Campagnes"}
            IconComponent={FolderCopyOutlinedIcon}
            link={"/search/surveys"}
            isActive={currentPath.includes("surveys")}
          />
          <NavigationListItem
            open={open}
            label={"Interrogations"}
            IconComponent={FileCopyOutlinedIcon}
            link={"/search/surveys"}
            isActive={currentPath.includes("surveys")}
          />
          <NavigationListItem
            open={open}
            label={"Unités enquêtées"}
            IconComponent={ApartmentOutlinedIcon}
            link={"/search/survey-units"}
            isActive={currentPath.includes("survey-units")}
          />
          <NavigationListItem
            open={open}
            label={"Contacts"}
            IconComponent={SupervisorAccountIcon}
            link={"/contacts"}
            isActive={currentPath.includes("contacts")}
          />
        </List>
        <Stack>
          <Divider style={{ background: theme.palette.text.light }} />
          <List sx={{ pt: 3, pb: 5 }}>
            {activeSettings && (
              <NavigationListItem
                open={open}
                label={"Profil"}
                IconComponent={PersonOutlinedIcon}
                link={"/reglages"}
                isActive={currentPath === "/reglages"}
              />
            )}
            <ListItem disablePadding sx={{ display: "block" }}>
              {logout && (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() =>
                    logout({
                      redirectTo: "specific url",
                      url: `${import.meta.env.VITE_APP_URL}/logout`,
                    })
                  }
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                      color: theme.palette.text.light,
                    }}
                  >
                    <PowerSettingsNewOutlinedIcon fontSize="navIcon" />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Se déconnecter"}
                    sx={{
                      opacity: open ? 1 : 0,
                      ".MuiTypography-root": { ...theme.typography.titleSmall },
                    }}
                  />
                </ListItemButton>
              )}
            </ListItem>
          </List>
          <Row justifyContent={"center"}>
            <img src="/logoInsee.png" alt="logo insee" width={open ? 65 : 24} height={open ? 69 : 28} />
          </Row>
        </Stack>
      </Stack>
    </Drawer>
  );
};
