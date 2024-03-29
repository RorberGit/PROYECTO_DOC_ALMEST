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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import api from "../../../../services/axios.service";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import Titles from "../../../Component/Titles";
import { RoutesURL } from "../../../Contants/Routes.contants";
import { messageAlert } from "../../../../utilities";
import { useShowMessage } from "../../../../hooks/useShowMessage";
import { useResultAPI } from "../../../../hooks/useResultAPI";

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

  const [data, setData] = useResultAPI(RoutesURL.UNIDADES);

  if (!isLoading) {
    setTimeout(() => {
      setIsLoading(() => true);
    }, 200);
  }

  const deleteRow = async (id) => {
    messageAlert().then(async (result) => {
      if (result.isConfirmed) {
        api
          .delete(`${RoutesURL.UNIDADES}/${id}`)
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
              onClick={() => navigate(`${RoutesURL.DETAIL}/${params.row.id}`)}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Editar">
            <IconButton
              color="warning"
              onClick={() => navigate(`${RoutesURL.EDIT}/${params.row.id}`)}
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
    { field: "id", headerName: "ID" },
    { field: "key", headerName: "Clave", width: 100 },
    { field: "name", headerName: "Departamentos / Unidades", width: 500 },
  ];

  return isLoading ? (
    <>
      <Titles
        title="Departamentos / Unidades"
        subtitle="Lista de Departamentos y Unidades"
      />
      <Box m={2}>
        <Box m={1}>
          <Button
            size="small"
            variant="contained"
            onClick={() => navigate(RoutesURL.INSERT)}
          >
            CREAR NUEVO(A) DEPARTAMENTO / UNIDAD
          </Button>
        </Box>
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
