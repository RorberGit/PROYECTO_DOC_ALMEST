import { useParams } from "react-router-dom";
import Titles from "../../../Component/Titles";
import { useResultAPI } from "../../../../hooks/useResultAPI";
import { RoutesURL } from "../../../Contants/Routes.contants";
import { FormatDate } from "../../../../utilities";
import {
  Backdrop,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Detail() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [data] = useResultAPI(`${RoutesURL.USERS}/${id}`);

  const [prev, setPrev] = useState([]);

  if (JSON.stringify(data) !== JSON.stringify(prev)) {
    setPrev(() => data);
    setTimeout(() => {
      setIsLoading(() => true);
    }, 200);
  }

  return isLoading ? (
    <>
      <Titles
        title="Detalles del Usuario"
        subtitle="Muestra todas las propiedades inherentes al usuario"
      />
      <Stack spacing={1} m={2}>
        <Divider />
        <Typography>
          <b>Usuario:</b> {data.user}
        </Typography>
        <Typography>
          <b>Nombre Completo:</b> {data.fullname}
        </Typography>
        <Typography>
          <b>Número de Documento de Identidad:</b> {data.dni}
        </Typography>
        <Typography>
          <b>Correo Elétronico:</b> {data.email}
        </Typography>
        <Typography>
          <b>Rol:</b> {data.roles}
        </Typography>
        <Typography>
          <b>Departamento/Unidad:</b> {data.idunidad.name}
        </Typography>
        <Typography>
          <b>Área:</b> {data.idarea.areas}
        </Typography>
        <Typography>
          <b>Cargo:</b> {data.idcargo.cargos}
        </Typography>
        <Typography>
          <b>Especialidad:</b> {data.idespecialidad.especialidades}
        </Typography>
        <Typography>
          <b>Creado:</b> {FormatDate(data.createdDate)}
        </Typography>
        <Typography>
          <b>Modificado:</b> {FormatDate(data.updatedDate)}
        </Typography>
      </Stack>
    </>
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
