import { Backdrop, Box, Button, CircularProgress, Stack } from "@mui/material";

import { Link } from "react-router-dom";

import { Delete, Edit, Visibility } from "@mui/icons-material";

import { messageAlert } from "../../utilities";
import { useShowMessage } from "../../hooks/useShowMessage";

import { Titles } from "../../Component";
import { RoutesURLRoot } from "../../contants/routes.constans";

import { useCallback, useEffect, useMemo, useState } from "react";

//import json from "./opci.json";
import Tabla from "./../../Component/mui/Tabla";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useAxiosToken from "../../hooks/useAxiosToken";
import { useFetch } from "../../hooks/useFetch";
import { useReduxUsuario } from "../../redux/hooks";

export default function View() {
  const [Message] = useShowMessage();

  const axiosToken = useAxiosToken();
  const [data, setData] = useState([]);

  const redux = useReduxUsuario();

  const opci = useFetch(
    redux.list.rol !== "OPCI"
      ? `${RoutesURLRoot.OPCI}/office/${redux.list.unidad}`
      : `${RoutesURLRoot.OPCI}`
  );

  useEffect(() => {
    setData(opci.data);
  }, [opci.data]);

  const deleteRow = useCallback(
    (id) => () => {
      messageAlert().then(async (result) => {
        if (result.isConfirmed) {
          await axiosToken
            .delete(`/${RoutesURLRoot.OPCI}/${id}`)
            .then(() => {
              setData((prev) => prev.filter((row) => row.id !== id));
              Message("Registro eliminado exitosamente", "success");
            })
            .catch((error) => {
              if (error?.response?.data?.code === "23503")
                Message(error?.response?.data?.detail, "error");
            });
        }
      });
    },
    [Message, axiosToken]
  );

  const columns = useMemo(
    () => [
      {
        field: "actions",
        type: "actions",
        width: 120,
        getActions: (params) =>
          redux.list.rol === "OPCI"
            ? [
                <GridActionsCellItem
                  key={1}
                  icon={<Visibility color="info" />}
                  label="Datail"
                  component={Link}
                  to={`${RoutesURLRoot.DETAIL}/${params.row.id}`}
                />,
                <GridActionsCellItem
                  key={2}
                  icon={<Edit color="warning" />}
                  label="Edit"
                  component={Link}
                  to={`${RoutesURLRoot.FORMULARIO}?action=update&id=${params.row.id}`}
                />,
                <GridActionsCellItem
                  key={3}
                  icon={<Delete color="error" />}
                  label="Delete"
                  onClick={deleteRow(params.id)}
                />,
              ]
            : [
                <GridActionsCellItem
                  key={1}
                  icon={<Visibility color="info" />}
                  label="Datail"
                  component={Link}
                  to={`${RoutesURLRoot.DETAIL}/${params.row.id}`}
                />,
              ],
      },
      {
        field: "conteo",
        headerName: "Número Registro",
        width: 130,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "codigo",
        headerName: "Registro Procedencia",
        width: 160,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "fecha",
        headerName: "Fecha",
        width: 100,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "idClasificacion",
        headerName: "Clasificación",
        width: 100,
        align: "center",
        headerAlign: "center",
        valueGetter: (params) => {
          return params.row.clasificacion_relation.nombre;
        },
      },
      {
        field: "idTipoDocumento",
        headerName: "Tipo documento",
        width: 130,
        align: "center",
        headerAlign: "center",
        valueGetter: (params) => {
          return params.row.tipodocumento_relation.nombre;
        },
      },
      {
        field: "estado",
        headerName: "Estado",
        align: "center",
        headerAlign: "center",
      },
      {
        field: "descripcion",
        headerName: "Asunto",
        width: 400,
        align: "left",
        headerAlign: "center",
      },
    ],
    [deleteRow, redux.list.rol]
  );

  return opci?.loading ? (
    <>
      <Titles title="Registro de Documentos OPCI" />
      <Stack spacing={2} m={2}>
        {redux.list.rol === "OPCI" && (
          <Box>
            <Button
              size="small"
              variant="contained"
              component={Link}
              to={`${RoutesURLRoot.FORMULARIO}?action=create`}
            >
              CREAR NUEVO REGISTRO
            </Button>
          </Box>
        )}
        <Box>
          <Tabla rows={data} columns={columns} />
        </Box>
      </Stack>
    </>
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!opci.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
