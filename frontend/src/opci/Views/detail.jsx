import { useParams } from "react-router-dom";
import Titles from "../../Component/Titles";
import {
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { FormatDate } from "../../utilities";
import { RoutesURLRoot } from "../../contants/routes.constans";

import { v4 as uuid } from "uuid";

import PropTypes from "prop-types";
import { useFetch } from './../../hooks/useFetch';

export default function Detail() {
  const { id } = useParams();

  const { data, loading, error } = useFetch(`${RoutesURLRoot.OPCI}/find/${id}`);

  console.log("data :>> ", data);

  return loading ? (
    error ? (
      <Typography>
        <b>{error}</b>
      </Typography>
    ) : (
      <>
        <Titles
          title="Detalles Registro de Documentos"
          subtitle="Muestra todas las propiedades inherentes"
        />
        <Stack spacing={1} m={2}>
          <Divider />
          <Typography>
            <b>No. Registro:</b> {data?.conteo}
          </Typography>
          <Typography>
            <b>Tipo de registro:</b> {data?.estado}
          </Typography>
          <Typography>
            <b>Tipo de documento:</b> {data?.tipodocumento_relation?.nombre}
          </Typography>
          <Typography>
            <b>Clasificación:</b>{" "}
            {data?.clasificacion_relation?.nombre}
          </Typography>
          <Typography>
            <b>Asunto:</b> {data?.descripcion}
          </Typography>
          <Stack direction="row" spacing="4">
            <Typography>
              <b>Procedencias:</b>
            </Typography>
            <Box>
              {data?.procedencia.map((item) => (
                <Typography marginLeft="5px" key={item.id}>
                  {item.nombre}
                </Typography>
              ))}
            </Box>
          </Stack>
          <Typography>
            <b>Registro de procedencia:</b> {data?.codigo}
          </Typography>
          <Typography>
            <b>Fecha de procedencia:</b> {data?.fecha}
          </Typography>
          <Stack direction="row" spacing="4">
            <Typography>
              <b>Destinos:</b>
            </Typography>
            <Box>
              {data?.destino.map((item) => (
                <Typography marginLeft="5px" key={item.id}>
                  {item.nombre}
                </Typography>
              ))}
            </Box>
          </Stack>
          <Stack direction="row" spacing="4">
            <Typography>
              <b>Visto en áreas:</b>
            </Typography>
            <Box>
              {data?.unidades.map((item) => (
                <Typography marginLeft="5px" key={item.id}>
                  {item.nombre}
                </Typography>
              ))}
            </Box>
          </Stack>
          {data?.nota ? (
            <Typography>
              <b>Nota:</b> {data?.nota}
            </Typography>
          ) : null}
          {data?.file.length ? (
            <Stack direction="row" spacing="4">
              <Typography>
                <b>Archivos adjuntos:</b>
              </Typography>
              <Box>
                {data?.file.map((item) => (
                  <Typography marginLeft="5px" key={uuid()}>
                    <a href={`uploads/${item}`} download>
                      {item}
                    </a>
                  </Typography>
                ))}
              </Box>
            </Stack>
          ) : null}

          <Divider />

          <Stack spacing={2} sx={{ p: 2, pr: 0 }}>
            {/*Llamada a componente trazas*/}

            {data?.trazasOpciId.map((item) => {
              return (
                <NewItem
                  key={uuid()}
                  label={item.estado}
                  color={item.estado === "Creado" ? "success" : "primary"}
                  usuario={item?.usuario_relation?.fullname}
                  unidad={item?.unidad_relation?.name}
                  fecha={item?.createdDate}
                />
              );
            })}
          </Stack>
        </Stack>
      </>
    )
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

/**Función para actualizar las trazas de los usuarios */
function NewItem(props) {
  const { label, color, usuario, unidad, fecha } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Chip label={label} color={color} />
      <Typography variant="body1">{usuario}</Typography>
      <Typography variant="subtitle2" color="darkgreen">
        {unidad}
      </Typography>
      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {FormatDate(fecha)}
      </Typography>
    </Stack>
  );
}

NewItem.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  usuario: PropTypes.string,
  unidad: PropTypes.string,
  fecha: PropTypes.string,
};
