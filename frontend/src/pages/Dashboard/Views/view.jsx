import { Box, Card, CardHeader, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RoutesURLRoot } from "../../../contants";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

export default function View() {
  const flujo = useSelector((state) => state.flujo);

  return (
    <>
      <Box
        sx={{
          "& > :not(style)": {
            m: 2,
            p: 2,
          },
        }}
      >
        <h1>Dashboard</h1>

        <Card>
          <CardHeader title={<b>Documentos por aprobar</b>} />
          {flujo[0] ? (
            <Stack spacing={2} sx={{ p: 2, pr: 0 }}>
              {flujo.map((values) => (
                <NewItem
                  key={uuid()}
                  docs={{
                    id: values.id,
                    codigo: values.codigo,
                    descripcion: values.descripcion,
                    unidad: values?.unidad,
                    fecha: values.fecha,
                  }}
                />
              ))}
            </Stack>
          ) : (
            <></>
          )}
        </Card>
      </Box>
    </>
  );
}

function NewItem({ docs }) {
  const { id, codigo, descripcion, unidad, fecha } = docs;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="body1">{codigo}</Typography>
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link to={`${RoutesURLRoot.DETAIL}/${id}`}>{descripcion}</Link>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {unidad}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {fecha}
      </Typography>
    </Stack>
  );
}

NewItem.propTypes = {
  docs: PropTypes.object,
};
