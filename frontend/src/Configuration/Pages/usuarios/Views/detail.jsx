import { useParams } from "react-router-dom";
import Titles from "../../../Component/Titles";
import { RoutesURL } from "../../../Contants/Routes.contants";
import { FormatDate } from "../../../../utilities";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useFetch } from "../../../../hooks/useFetch";

export default function Detail() {
  const { id } = useParams();
  
  const usuarios = useFetch(`${RoutesURL.USUARIOS}/${id}`);

  return usuarios.loading ? (
    <>
      <Titles
        title="Detalles del Usuario"
        subtitle="Muestra todas las propiedades inherentes al usuario"
      />
      <Stack spacing={1} m={2}>
        <Divider />
        {usuarios.error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {usuarios.error}
          </Alert>
        )}
        <Typography>
          <b>Usuario:</b> {usuarios.data.user}
        </Typography>
        <Typography>
          <b>Nombre Completo:</b> {usuarios.data.fullname}
        </Typography>
        {usuarios?.data?.dni && (
          <Typography>
            <b>Número de Documento de Identidad:</b> {usuarios?.data?.dni}
          </Typography>
        )}
        {usuarios?.data?.email && (
          <Typography>
            <b>Correo Elétronico:</b> {usuarios.data.email}
          </Typography>
        )}
        <Typography>
          <b>Rol:</b> {usuarios.data.roles}
        </Typography>
        <Typography>
          <b>Departamento/Unidad:</b> {usuarios?.data?.unidad_relation?.nombre}
        </Typography>        
        <Typography>
          <b>Cargo:</b> {usuarios?.data?.cargo_relation?.nombre}
        </Typography>
        <Typography>
          <b>Especialidad:</b> {usuarios?.data?.especialidad_relation?.nombre}
        </Typography>
        <Typography>
          <b>Creado:</b> {FormatDate(usuarios.data.createdDate)}
        </Typography>
        <Typography>
          <b>Modificado:</b> {FormatDate(usuarios.data.updatedDate)}
        </Typography>
      </Stack>
    </>
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!usuarios.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
