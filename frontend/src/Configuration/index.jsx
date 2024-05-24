import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link as LinkMUI } from "@mui/material";
import Navigator from "./Component/Navigator";
import Header from "./Component/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import { RoutesURL } from "./Contants/Routes.contants";
import Procedencia from "./Pages/procedencia";
import Destino from "./Pages/destino";
import TipoDoc from "./Pages/tipoDoc";
import RoleGuard from "../guards/Rol.guard";
import { Roles } from "../contants/models.constans";
import DashboardConfig from "./Pages/DashboardConfig";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <LinkMUI color="inherit" href="https://mui.com/">
        Your Website
      </LinkMUI>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  typography: {
    h2: {
      fontWeight: 500,
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 32,
      letterSpacing: 0.5,
    },
    h5: {
      fontWeight: 500,
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 16,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});
theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

const Usuarios = React.lazy(async () => await import("./Pages/usuarios"));
const Unit = React.lazy(async () => await import("./Pages/unidades"));
const Positions = React.lazy(async () => await import("./Pages/cargos"));
const Specialties = React.lazy(
  async () => await import("./Pages/especialidades")
);
const Classification = React.lazy(
  async () => await import("./Pages/clasificacionDoc")
);

export default function Configuration() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/*Mostrar menu si el zoom de la web esta aumentado*/}
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}

          {/*Siempre mostrar menu*/}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/*Mostrar encabezado*/}
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ flex: 1, py: 4, px: 4, bgcolor: "#eaeff1" }}
          >
            {/*Rutas de contenido*/}
            <Routes>
              <Route index element={<Navigate to="dashboardconfig" />} />
              <Route path="dashboardconfig" element={<DashboardConfig />} />

              <Route element={<RoleGuard rol={[Roles.SUPER, Roles.ADMIN]} />}>
                <Route
                  path={RoutesURL.USUARIOS + "/*"}
                  element={<Usuarios />}
                />
                <Route path={RoutesURL.UNIDADES + "/*"} element={<Unit />} />
                <Route path={RoutesURL.CARGOS + "/*"} element={<Positions />} />
                <Route
                  path={RoutesURL.ESPECIALIDADES + "/*"}
                  element={<Specialties />}
                />
                <Route
                  path={RoutesURL.DOCCLASIFICACION + "/*"}
                  element={<Classification />}
                />
                <Route
                  path={RoutesURL.TIPO_DOCUMENTOS + "/*"}
                  element={<TipoDoc />}
                />
              </Route>

              <Route
                path={RoutesURL.PROCEDENCIA + "/*"}
                element={<Procedencia />}
              />
              <Route path={RoutesURL.DESTINO + "/*"} element={<Destino />} />

              <Route path="*" element={<div>Página no encontrada</div>} />
            </Routes>
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            {/*Mostrar Derechos de copia*/}
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
