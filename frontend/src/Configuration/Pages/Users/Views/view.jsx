import {
  Backdrop,
  Box,
  Button,
  CircularProgress,  
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Delete, Edit, Visibility } from "@mui/icons-material";
import Titles from "../../../Component/Titles";
import { RoutesURL } from "../../../Contants/Routes.contants";
import { messageAlert } from "../../../../utilities";
import { useShowMessage } from "../../../../hooks/useShowMessage";

import { useSelector } from "react-redux";
import useFetchUsuarios from "../hooks/useFetchUsuarios";
import { axiosToken } from "../../../../api/axios";

//import us from "../usuarios.json";
import { useCallback, useEffect, useMemo, useState } from "react";
import Tabla from "../../../../Component/mui/Tabla";
import { GridActionsCellItem } from "@mui/x-data-grid";

export default function View() {
  const { usuario, idUnidad } = useSelector((state) => state.user);
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const [Message] = useShowMessage();

  const usuarios = useFetchUsuarios();

  useEffect(() => {
    setData(usuarios.data);
  }, [usuarios.data]);

  const deleteUser = useCallback(
    (id) => () => {
      messageAlert().then(async (result) => {
        if (result.isConfirmed) {
          axiosToken
            .delete(`${RoutesURL.USERS}/${id}`)
            .then((response) => {
              return response.data;
            })
            .then((response) => {
              if (response.statusCode === 200) {
                setData((prevRows) => prevRows.filter((row) => row.id !== id));

                Message("Registro eliminado exitosamente", "success");
              } else console.log(result);
            })
            .catch((error) => {
              Message(error?.response?.data?.message, "error");
            });
        }
      });
    },
    [Message]
  );

  const columns = useMemo(
    () => [
      {
        field: "actions",
        type: "actions",
        width: 120,
        getActions: (params) => [
          <GridActionsCellItem
            key={1}
            icon={<Visibility color="info" />}
            label="Datail"
            onClick={() => navigate(`${RoutesURL.DETAIL}/${params.row.id}`)}
          />,
          <GridActionsCellItem
            key={2}
            icon={<Edit color="warning" />}
            label="Edit"
            onClick={() => navigate(`${RoutesURL.EDIT}/${params.row.id}`)}
          />,
          <GridActionsCellItem
            key={3}
            icon={<Delete color="error" />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
        ],
      },
      { field: "user", headerName: "Usuario", width: 150 },
      { field: "fullname", headerName: "Nombre Completo", width: 200 },
      { field: "dni", headerName: "Número de Identidad", width: 200 },
      { field: "email", headerName: "Correo Electrónico", width: 200 },
      { field: "roles", headerName: "Rol" },
      {
        field: "unidad_relation",
        headerName: "Unidad o Departamento",
        width: 200,
        valueGetter: (params) => {
          return params.row.unidad_relation.nombre;
        },
      },
    ],
    [deleteUser, navigate]
  );

  return usuarios?.loading ? (
    <>
      <Titles title="Usuarios" subtitle="Lista de usuarios" />
      <Box m={2}>
        <Box m={1}>
          <Button
            size="small"
            variant="contained"
            onClick={() => navigate(RoutesURL.INSERT)}
          >
            CREAR NUEVO USUARIO
          </Button>
        </Box>
        <Box>
          <Tabla
            rows={
              usuario === "administrador"
                ? data
                : data.filter((row) => row.unidad_relation.id === idUnidad)
            }
            columns={columns}
          />
        </Box>
      </Box>
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
