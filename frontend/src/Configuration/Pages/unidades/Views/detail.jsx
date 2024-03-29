import { useParams } from "react-router-dom";
import Titles from "../../../Component/Titles";
import {
  Backdrop,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { RoutesURL } from "../../../Contants/Routes.contants";
import { useResultAPI } from "../../../../hooks/useResultAPI";
import { FormatDate } from "../../../../utilities";

export default function Detail() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [data] = useResultAPI(`${RoutesURL.UNIDADES}/${id}`);

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
        title="Detalles del Departamento o Unidad"
        subtitle="Muestra todas las propiedades inherentes"
      />
      <Stack spacing={1} m={2}>
        <Divider />
        <Typography>
          <b>Clave:</b> {data.key}
        </Typography>
        <Typography>
          <b>Departamento / Unidad:</b> {data.name}
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
