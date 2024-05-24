import { Home } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";

import MenuUsers from "./MenuUsers";
import { NavLink } from "react-router-dom";
import { RoutesURLRoot } from "../contants/routes.constans";
import { useSelector } from "react-redux";
import { useRouter } from "../hooks";

export default function Header() {
  const flujoState = useSelector((state) => state.flujo);

  const router = useRouter();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="Inicio">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => router.push(RoutesURLRoot.ROOT)}
              >
                <Home />
              </IconButton>
            </Tooltip>
            <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
              <NavLink
                to={RoutesURLRoot.REGISTROS}
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isPending ? "red" : "white",
                    fontSize: "1.25rem",
                    textDecoration: isActive ? "underline" : "none",
                    hover: {
                      backgroundColor: "red",
                    },
                  };
                }}
              >
                REGISTROS
              </NavLink>

              <NavLink
                to={RoutesURLRoot.OPCI}
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isPending ? "red" : "white",
                    fontSize: "1.25rem",
                    textDecoration: isActive ? "underline" : "none",
                    hover: {
                      backgroundColor: "red",
                    },
                  };
                }}
              >
                OPCI
              </NavLink>
            </Stack>
            {/*Menu de usuario*/}
            <Tooltip title="Alerts • No alerts">
              <IconButton color="inherit" aria-label="asasas">
                <Badge badgeContent={flujoState.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <MenuUsers />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
