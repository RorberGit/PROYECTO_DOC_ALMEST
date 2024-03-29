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
import { replace } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../redux/states/userSlice";
import { useNavigate } from "react-router-dom";
import { RoutesURLRoot } from "../contants/routes.constans";
import { RoutesURL } from "../Configuration/Contants/Routes.contants";
import api from "../services/axios.service";

export default function MenuUsers() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [avatarImg, setAvatarImg] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //poner avatar si esta presente el la base de datos
  useEffect(() => {
    const fetchCurrentAvatar = async () => {
      let ignore = false;
      try {
        const { data } = await api.get(
          `${RoutesURL.USERS}/${userState.idUsuario}`
        );

        if (!ignore) {
          if (data.statusCode === 200) {
            if (data.data.avatarId) {
              setAvatarImg(
                `${RoutesURLRoot.APIURL}/avatar/${data.data.avatarId}`
              );
            }
          }
        }
      } catch (error) {
        console.log(error?.response?.data);
      } finally {
        ignore = true;
      }
    };

    fetchCurrentAvatar();
  }, [userState.idUsuario]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Menú de Usuario">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {/*Poner imagen de avatar del usuario*/}
          <Avatar src={avatarImg} />
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
          {userState.fullname}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <HomeWork fontSize="small" />
          </ListItemIcon>
          {userState.unidad}
        </MenuItem>
        <Divider />
        {/*Avatar*/}
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            navigate(`/avatar/${userState.idUsuario}`, replace);
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
            navigate("/config", replace);
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
            dispatch(resetUser());
            navigate(`/${RoutesURLRoot.LOGIN}`, { replace: true });
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
