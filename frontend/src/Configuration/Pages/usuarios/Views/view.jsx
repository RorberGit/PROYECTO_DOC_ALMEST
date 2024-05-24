import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

import { Delete, Edit, Visibility } from "@mui/icons-material";
import Titles from "../../../Component/Titles";
import { RoutesURL } from "../../../Contants/Routes.contants";
import { messageAlert } from "../../../../utilities";
import { useShowMessage } from "../../../../hooks/useShowMessage";

import { useCallback, useEffect, useMemo, useState } from "react";
import Tabla from "../../../../Component/mui/Tabla";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useAxiosToken from "../../../../hooks/useAxiosToken";
import { useReduxUsuario } from "../../../../redux/hooks";
import { useFetch } from "../../../../hooks/useFetch";

export default function View() {
  //const { usuario, idUnidad } = useSelector((state) => state.user);
  const redux = useReduxUsuario();
  const [data, setData] = useState(null);

  const [Message] = useShowMessage();

  const axiosToken = useAxiosToken();

  const usuarios = useFetch(RoutesURL.USUARIOS);

  useEffect(() => {
    setData(usuarios.data);
  }, [usuarios.data]);

  const deleteUser = useCallback(
    (id) => () => {
      messageAlert().then(async (result) => {
        if (result.isConfirmed) {
          axiosToken
            .delete(`${RoutesURL.USUARIOS}/${id}`)
            .then((response) => {
              return response.data;
            })
            .then(() => {
              setData((prev) => prev.filter((row) => row.id !== id));

              Message("Registro eliminado exitosamente", "success");
            })
            .catch((error) => {
              Message(error?.response?.data?.message, "error");
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
        getActions: (params) => [
          <GridActionsCellItem
            key={1}
            icon={<Visibility color="info" />}
            label="Datail"
            component={Link}
            to={`${RoutesURL.DETAIL}/${params.row.id}`}
          />,
          <GridActionsCellItem
            key={2}
            icon={<Edit color="warning" />}
            label="Edit"
            component={Link}
            to={`${RoutesURL.FORMULARIO}?action=update&id=${params.row.id}`}
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
      { field: "dni", headerName: "Número de Identidad", width: 150 },
      { field: "email", headerName: "Correo Electrónico", width: 200 },
      { field: "roles", headerName: "Rol", width: 120 },
      {
        field: "unidad_relation",
        headerName: "Unidad o Departamento",
        width: 200,
        valueGetter: (params) => {
          return params.row.unidad_relation.nombre;
        },
      },
    ],
    [deleteUser]
  );

  return usuarios?.loading ? (
    <>
      <Titles title="Usuarios" subtitle="Lista de usuarios" />
      <Box m={2}>
        <Box m={1}>
          <Button
            size="small"
            variant="contained"
            component={Link}
            to={`${RoutesURL.FORMULARIO}?action=create`}
          >
            CREAR NUEVO USUARIO
          </Button>
        </Box>
        <Box>
          <Tabla
            rows={
              redux.list.usuario === "administrador"
                ? data
                : data.filter(
                    (row) => row.unidad_relation.id === redux.list.idUnidad
                  )
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
