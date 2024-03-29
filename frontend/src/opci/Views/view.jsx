import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import api from "../../services/axios.service";
import { Delete, Edit, Visibility } from "@mui/icons-material";

import { messageAlert } from "../../utilities";
import { useShowMessage } from "../../hooks/useShowMessage";

import { Titles } from "../../Component";
import { RoutesURLRoot } from "../../contants/routes.constans";

import { useEffect, useState } from "react";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  esES
);

export default function View() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [Message] = useShowMessage();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    await api
      .get(RoutesURLRoot.OPCI)
      .then((value) => {
        if (value.status === 200) setData(value.data.data);
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteRow = async (id) => {
    messageAlert().then(async (result) => {
      if (result.isConfirmed) {
        await api
          .delete(`/${RoutesURLRoot.OPCI}/${id}`)
          .then((result) => {
            if (result.data.statusCode === 200) {
              Message("Registro eliminado exitosamente", "success");
              setTimeout(() => {
                setData((prevRows) => prevRows.filter((row) => row.id !== id));
              });
            }
          })
          .catch((error) => {
            if (error?.response?.data?.code === "23503")
              Message(error?.response?.data?.detail, "error");
          });
      }
    });
  };

  const columns = [
    {
      field: "action",
      headerName: "",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip placement="top" title="Detalles">
            <IconButton
              color="info"
              onClick={() =>
                navigate(`${RoutesURLRoot.DETAIL}/${params.row.id}`)
              }
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Editar">
            <IconButton
              color="warning"
              onClick={() =>
                navigate(
                  `${RoutesURLRoot.FORMULARIO}?action=update&id=${params.row.id}`
                )
              }
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Eliminar">
            <IconButton color="error" onClick={() => deleteRow(params.id)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      type: "string",
      align: "left",
      headerAlign: "left",
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
      field: "clasificacion",
      headerName: "Clasificación",
      width: 100,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        return params.row.ClasificacionDocumento_relation.nombre;
      },
    },
    {
      field: "tipodocumento",
      headerName: "Tipo Documento",
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
  ];

  return isLoading ? (
    <>
      <Titles title="Registro de Documentos OPCI" />
      <Stack spacing={2} m={2}>
        <Stack direction="row" spacing={2}>
          <Button
            size="small"
            variant="contained"
            onClick={() =>
              navigate(`${RoutesURLRoot.FORMULARIO}?action=insert`)
            }
          >
            CREAR NUEVO REGISTRO
          </Button>
        </Stack>
        <Box>
          <ThemeProvider theme={theme}>
            <DataGrid
              rows={data}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              autoHeight
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    id: false,
                    createdDate: false,
                    updatedDate: false,
                  },
                },
              }}
            />
          </ThemeProvider>
        </Box>
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
