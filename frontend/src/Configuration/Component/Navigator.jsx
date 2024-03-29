import { useState } from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";
import {
  Apartment,
  Diversity3,
  Home,
  HomeWork,
  InsertDriveFile,
  ManageAccounts,
  School,
} from "@mui/icons-material";

const categories = [
  {
    id: "Estructuras UBs",
    children: [
      {
        id: "Usuarios",
        icon: <ManageAccounts />,
        path: "users",
      },
      {
        id: "Unidades o Departamentos",
        icon: <HomeWork />,
        path: "units",
      },
      { id: "Áreas", icon: <Apartment />, path: "areas" },
      { id: "Cargos", icon: <Diversity3 />, path: "positions" },
      { id: "Especialidades", icon: <School />, path: "specialties" },
    ],
  },
  {
    id: "Estructura Registros",
    children: [
      {
        id: "Clasificación de Documentos",
        icon: <InsertDriveFile />,
        path: "classification",
      },
      {
        id: "Otras Entidades",
        icon: <HomeWork />,
        path: "otherentity",
      },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Usuarios");

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          Configuración
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemButton onClick={() => navigate("/", replace)}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>Inicio</ListItemText>
          </ListItemButton>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={selected === childId}
                  sx={item}
                  onClick={() => {
                    setSelected(childId);
                    navigate(path);
                  }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
