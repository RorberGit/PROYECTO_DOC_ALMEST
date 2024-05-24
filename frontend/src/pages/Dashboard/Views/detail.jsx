import { useParams } from "react-router-dom";
import Titles from "../../../Component/Titles";
import {
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { FormatDate } from "../../../utilities";

import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { RoutesURLRoot } from "../../../contants";
import { useShowMessage } from "../../../hooks/useShowMessage";
import { v4 as uuid } from "uuid";
import axios from "../../../api/axios";
import { PropTypes } from "prop-types";

export default function Detail() {
  const [isLoading] = useState(true);
  const [aprobaciones, setAprobaciones] = useState();
  const { id } = useParams();

  const flujo = useSelector((state) => state.flujo);

  const current = flujo.filter((item) => {
    return item.id === id;
  });

  const FetchingAprobaciones = async () => {
    const result = await axios.get(
      `${RoutesURLRoot.APROBACIONES}/reg/${current[0]?.id}`
    );

    if (result.data.statusCode === 200) {
      setAprobaciones(result.data.data);
    }
  };

  useEffect(() => {
    FetchingAprobaciones();
  }, []);

  return isLoading ? (
    <>
      <Titles
        title="Detalles Registro de Documentos"
        subtitle="Muestra todas las propiedades inherentes"
      />
      <Stack spacing={1} m={2}>
        <Divider />
        <Typography>
          <b>id:</b> {current[0]?.id}
        </Typography>
        <Typography>
          <b>Código:</b> {current[0]?.codigo}
        </Typography>
        <Typography>
          <b>Fecha:</b> {current[0]?.fecha}
        </Typography>
        <Typography>
          <b>Descripción:</b> {current[0]?.descripcion}
        </Typography>
        <Typography>
          <b>Clasificación:</b> {current[0]?.clasificacion}
        </Typography>
        <Stack direction="row" spacing="4">
          <Typography>
            <b>Con Destino:</b>
          </Typography>
          <Box>
            {current[0]?.destino.map((item) => (
              <Typography marginLeft="5px" key={item.id}>
                {item.name}
              </Typography>
            ))}
          </Box>
        </Stack>
        <Typography>
          <b>Unidad / Departamento:</b> {current[0]?.unidad}
        </Typography>
        {current[0]?.file ? (
          <Typography>
            <b>Archivo adjunto:</b>{" "}
            <a href={`uploads/${current[0]?.file}`} download>
              {current[0]?.file}
            </a>
          </Typography>
        ) : null}
      </Stack>
      <Divider />
      {/*Llamada a componente botones*/}
      <Botones
        datos={{
          idRegistroDoc: current[0]?.id,
          idFirmantes: current[0]?.idFirmante,
          ordenf: current[0]?.ordenFirmmante,
          idFlujo: current[0]?.idFlujo,
        }}
      />
      <Divider />
      <Stack spacing={2} sx={{ p: 2, pr: 0 }}>
        {/*Llamada a componente trazas*/}
        <NewItem
          key={uuid()}
          prp={{
            label: "Elaborado",
            color: "primary",
            creadopor: current[0]?.creadopor,
            unidad: current[0]?.unidad,
            createdDate: current[0]?.createdDate,
          }}
        />
        {aprobaciones &&
          aprobaciones.map((value) => {
            return (
              <NewItem
                key={uuid()}
                prp={{
                  label: value.estado,
                  color:
                    value.estado === "Aprobado"
                      ? "success"
                      : value.estado === "Redirigido"
                      ? "error"
                      : "",
                  creadopor: value.firmantes_relation.usuario_relation.fullname,
                  unidad:
                    value.firmantes_relation.usuario_relation.unidad_relation
                      .name,

                  createdDate: value.createdDate,
                }}
              />
            );
          })}
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

/**Funcion de los botones de accion */
function Botones({ datos }) {
  const { idFirmantes, idRegistroDoc, ordenf, idFlujo } = datos;
  const [obs, setObs] = useState("");
  const [Message] = useShowMessage();

  return (
    <>
      <Stack spacing={2} sx={{ p: 2, pr: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/**Botón de aprobar el registro */}
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              Swal.fire({
                title: "¿Aprobar este registro?",
                text: "¡Esta acción no se puede deshacer!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "No",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Si!",
              }).then(async (confir) => {
                if (confir.isConfirmed) {
                  const reg = {
                    estado: "Aprobado",
                    idFirmantes: idFirmantes,
                    idRegistroDoc: idRegistroDoc,
                    observaciones: obs,
                  };

                  const resultInsert = await axios.post(
                    RoutesURLRoot.APROBACIONES,
                    reg
                  );

                  let estado = "";

                  const count = await axios.get(
                    `${RoutesURLRoot.FIRMANTES}/count/${idFlujo}`
                  );

                  if (count.data.statusCode === 200) {
                    ordenf === count.data.data
                      ? (estado = "Aprobado")
                      : (estado = "Por aprobar");
                  }

                  const resultUpdate = await axios.put(
                    `${RoutesURLRoot.REGISTROS}/${idRegistroDoc}`,
                    {
                      ordenf: ordenf,
                      estado: estado,
                    }
                  );

                  if (resultInsert.data.statusCode === 201) {
                    Message(`Registro aprobado exitosamente`, "success");
                    window.location.replace(`/#/${RoutesURLRoot.DASHBOARD}`);
                    window.location.reload();
                  }

                  console.log("datos", resultUpdate);
                }
              });
            }}
          >
            Aprobar
          </Button>
          {/*Boton de redirigir el registro*/}
          <Button variant="contained" color="error">
            Redirigir
          </Button>
          <TextField
            name="observacones"
            placeholder="Observaciones"
            size="small"
            onChange={(event) => {
              setObs(() => event.target.value);
              console.log(event.target.value);
            }}
            multiline
            sx={{ width: "600px" }}
          />
        </Stack>
      </Stack>
    </>
  );
}

Botones.propTypes = {
  datos: PropTypes.object,
};

/**Función para actualizar las trazas de los usuarios */
function NewItem({ prp }) {
  const { label, color, creadopor, unidad, createdDate } = prp;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Chip label={label} color={color} />
      <Typography variant="body1">{creadopor}</Typography>
      <Typography variant="subtitle2" color="darkgreen">
        {unidad}
      </Typography>
      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {FormatDate(createdDate)}
      </Typography>
    </Stack>
  );
}

NewItem.propTypes = {
  prp: PropTypes.object,
};
