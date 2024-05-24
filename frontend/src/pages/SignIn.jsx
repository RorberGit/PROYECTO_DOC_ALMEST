import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useLocation, useNavigate } from "react-router-dom";
import { useReduxUsuario } from "../redux/hooks";
import { useStorageToken } from "../hooks";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://www.hra.almest.cu/">
        Desarrollo ALMEST
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const redux = useReduxUsuario();
  const token = useStorageToken();

  const location = useLocation();

  const [errorUsuario, setErrorUsuario] = useState(false);
  const [helpeUsuario, setHelperUsuario] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [helpePassword, setHelperPassword] = useState("");

  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  //Eliminar login de usuario
  useEffect(() => {
    token.remove();
    redux.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Evento del boton
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const usuario = data.get("usuario");
    const password = data.get("password");

    const response = await AuthService.login(usuario, password);

    if (response.statusCode === 404) {
      setErrorUsuario(true);
      setHelperUsuario("Usuario no encontrado");
    }

    if (response.statusCode === 406) {
      setErrorPassword(true);
      setHelperPassword("Contraseña Incorrecta");
    }

    if (response.statusCode === 200) {
      redux.create({
        idUsuario: response.data.id,
        fullname: response.data.fullname,
        usuario: response.data.user,
        rol: response.data.roles,
        idUnidad: response.data.unidad_relation.id,
        keyUnidad: response.data.unidad_relation.key,
        unidad: response.data.unidad_relation.nombre,
        foto: response.data.foto,
      });

      token.setToken({
        id: response.data.id,
        accessToken: response.data.accessToken,
      });

      navigate(from, { replace: true });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="almest.png" />

          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Usuario"
                name="usuario"
                autoComplete="usuario"
                autoFocus
                onChange={() => {
                  setErrorUsuario(false);
                  setHelperUsuario("");
                }}
                error={errorUsuario}
                helperText={helpeUsuario}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                autoComplete="current-password"
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={() => {
                  setErrorPassword(false);
                  setHelperPassword("");
                }}
                error={errorPassword}
                helperText={helpePassword}
              />

              <Box textAlign="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: 100 }}
                >
                  Aceptar
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
