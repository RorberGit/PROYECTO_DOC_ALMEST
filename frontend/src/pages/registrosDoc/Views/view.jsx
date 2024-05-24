import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";

import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import { Delete, Visibility } from "@mui/icons-material";

import { messageAlert } from "../../../utilities";
import { useShowMessage } from "../../../hooks/useShowMessage";

import { Titles } from "../../../Component";
import { RoutesURLRoot } from "../../../contants/routes.constans";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../api/axios";
import { useRouter } from "../../../hooks";

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
  const { idUnidad } = useSelector((state) => state.user);
  const router = useRouter();
  const [Message] = useShowMessage();
  const [datareg, setDataReg] = useState([]);

  const [data, setData] = useState([]);

  const ignore = useRef(false);

  useEffect(() => {
    const fetchRegistros = async () => {
      ignore.current = false;
      try {
        const result = await axios.get(
          `${RoutesURLRoot.REGISTROS}/unit/${idUnidad}`
        );

        if (!ignore.current && result.data.statusCode === 200) {
          setData(() => result.data.data);
        }
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    fetchRegistros();

    return () => {
      ignore.current = true;
    };
  }, [idUnidad]);

  //Convertir los datos que se necesitan en la tabla
  useEffect(() => {
    setDataReg(
      data.map((row) => ({
        id: row.id,
        codigo: row.codigo,
        descripcion: row.descripcion,
        fecha: row.fecha,
        idClasificacion: row?.idClasificacion?.id,
        keyClasificacion: row?.idClasificacion?.key,
        clasificacion: row?.idClasificacion?.name,
        idUnidad: row?.idUnidad?.id,
        keyUnidad: row?.idUnidad?.key,
        unidad: row?.idUnidad?.name,
        idUsuario: row?.idUsuario?.id,
        usuario: row?.idUsuario?.fullname,
        createdDate: row.createdDate,
        updatedDate: row.updatedDate,
      }))
    );

    setIsLoading(true);
  }, [data]);

  const deleteRow = async (id) => {
    messageAlert().then(async (result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/${RoutesURLRoot.REGISTROS}/${id}`)
          .then((result) => {
            if (result.data.statusCode === 200) {
              Message("Registro eliminado exitosamente", "success");
              setTimeout(() => {
                setData((prevRows) => prevRows.filter((row) => row.id !== id));
              });
            } else console.log(result);
          })
          .catch((error) => {
            Message(error.response.data.message, "error");
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
                router.pust(`${RoutesURLRoot.DETAIL}/${params.row.id}`)
              }
            >
              <Visibility />
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
    { field: "id", headerName: "ID" },
    { field: "codigo", headerName: "Código", width: 150 },
    { field: "descripcion", headerName: "Descripción", width: 400 },
    { field: "clasificacion", headerName: "Clasificación", width: 100 },
    { field: "unidad", headerName: "Unidades/Departamentos", width: 200 },
    { field: "usuario", headerName: "Usuarios", width: 200 },
    { field: "fecha", headerName: "Fecha", width: 100 },
  ];

  return isLoading ? (
    <>
      <Titles title="Registro de Documentos" />
      <Box m={2}>
        <Box m={1}>
          <Button
            size="small"
            variant="contained"
            onClick={() => router.push(RoutesURLRoot.INSERT)}
          >
            CREAR NUEVO REGISTRO
          </Button>
        </Box>
        <Box>
          <ThemeProvider theme={theme}>
            <DataGrid
              rows={datareg}
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
      </Box>
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
