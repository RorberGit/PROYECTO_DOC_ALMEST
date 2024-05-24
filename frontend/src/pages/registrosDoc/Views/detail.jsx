import { useParams } from "react-router-dom";
import Titles from "../../../Component/Titles";
import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { FormatDate } from "../../../utilities";
import { RoutesURLRoot } from "../../../contants/routes.constans";
import { useFetch } from "../../../hooks";

export default function Detail() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { data } = useFetch(`${RoutesURLRoot.REGISTROS}/regi/${id}`);

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
        title="Detalles Registro de Documentos"
        subtitle="Muestra todas las propiedades inherentes"
      />
      <Stack spacing={1} m={2}>
        <Divider />
        <Typography>
          <b>id:</b> {data?.id}
        </Typography>
        <Typography>
          <b>Código:</b> {data?.codigo}
        </Typography>
        <Typography>
          <b>Fecha:</b> {data?.fecha}
        </Typography>
        <Typography>
          <b>Descripción:</b> {data?.descripcion}
        </Typography>
        <Typography>
          <b>Clasificación:</b> {data?.idClasificacion?.name}
        </Typography>
        <Stack direction="row" spacing="4">
          <Typography>
            <b>Con Destino:</b>
          </Typography>
          <Box>
            {data.destino.map((item) => (
              <Typography marginLeft="5px" key={item.id}>
                {item.name}
              </Typography>
            ))}
          </Box>
        </Stack>
        <Typography>
          <b>Unidad / Departamento:</b> {data?.idUnidad?.name}
        </Typography>
        {data.file ? (
          <Typography>
            <b>Archivo adjunto:</b>{" "}
            <a href={`uploads/${data?.file}`} download>
              {data?.file}
            </a>
          </Typography>
        ) : null}
        <Typography>
          <b>Creado por:</b> {data?.idUsuario?.fullname}
        </Typography>
        <Typography>
          <b>Creado:</b> {FormatDate(data?.createdDate)}
        </Typography>
        <Typography>
          <b>Modificado:</b> {FormatDate(data?.updatedDate)}
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
