import { useParams } from "react-router-dom";
import Titles from "../../../Component/Titles";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { RoutesURL } from "../../../Contants/Routes.contants";
import { FormatDate } from "../../../../utilities";
import { useFetch } from "../../../../hooks/useFetch";

export default function Detail() {
  const { id } = useParams();
  const { data, error, loading } = useFetch(
    `${RoutesURL.DESTINO}/${id}`
  );

  return loading ? (
    <>
      <Titles
        title="Detalles del Destino"
        subtitle="Muestra todas las propiedades inherentes"
      />
      <Stack spacing={1} m={2}>
        <Divider />
        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        )}
        <Typography>
          <b>Destino:</b> {data?.nombre}
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
      open={!loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
