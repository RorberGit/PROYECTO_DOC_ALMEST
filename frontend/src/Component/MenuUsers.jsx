import {
  AccountCircle,
  HomeWork,
  Logout,
  Person,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

import { RoutesURLRoot } from "../contants/routes.constans";
import { useState } from "react";
import { useReduxUsuario } from "../redux/hooks";
import { useRouter } from "../hooks";

export default function MenuUsers() {
  const usuario = useReduxUsuario();
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Menú de Usuario">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {/*Poner imagen de avatar del usuario*/}
          <Avatar src={usuario.list.foto} />
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
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          {usuario.list.fullname}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <HomeWork fontSize="small" />
          </ListItemIcon>
          {usuario.list.unidad}
        </MenuItem>
        <Divider />
        {/*Avatar*/}
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            router.push(`/avatar/${usuario.list.idUsuario}`);
          }}
        >
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Avatar
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            router.push("/config");
          }}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuración
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            router.push(`/${RoutesURLRoot.LOGIN}`);
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </Box>
  );
}
