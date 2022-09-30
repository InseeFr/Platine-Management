import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Divider, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useContext } from "react";
import { UserAccountContext } from "ui/context/UserAccount";
import { AccountCircle } from "@mui/icons-material";
import { getRoutesForUser } from "core/role";
import { AuthContext } from "ui/context/auth/provider";
import { AppContext } from "App";

const ResponsiveAppBar = () => {
  const { moogUrl } = useContext(AppContext);
  const { logout } = useContext(AuthContext);
  const { user } = useContext(UserAccountContext);

  const routesAllowedForUser = getRoutesForUser(user?.roles, moogUrl);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = [
    {
      title: "Mon profil",
      action: () => {
        console.log("ToDo!");
      },
    },
    { title: "Déconnexion", action: logout },
  ];
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/pilotage/accueil"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PILOTAGE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {routesAllowedForUser.map(page => {
                const content = (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                );
                if (page.external)
                  return (
                    <a
                      style={{ textDecoration: "none", color: "black" }}
                      href={page.fullPath}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {content}
                    </a>
                  );
                return (
                  <Link
                    key={page.label}
                    style={{ textDecoration: "none", color: "black" }}
                    to={page.fullPath}
                  >
                    {content}
                  </Link>
                );
              })}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/pilotage/accueil"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PILOTAGE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {routesAllowedForUser.map(page => {
              const content = (
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                  {page.label}
                </Button>
              );
              if (page.external)
                return (
                  <a
                    style={{ textDecoration: "none", color: "white" }}
                    href={page.fullPath}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content}
                  </a>
                );
              return (
                <Link
                  key={page.label}
                  style={{ textDecoration: "none", color: "white" }}
                  to={page.fullPath}
                >
                  {content}
                </Link>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/logo-proto.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <ListItem>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText>{user.name}</ListItemText>
              </ListItem>
              <Divider />
              {settings.map(({ title, action }) => (
                <MenuItem key={title} onClick={action}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
