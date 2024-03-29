import { ThemeProvider, createTheme } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import PropTypes from "prop-types";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  esES
);

function Tabla(props) {
  const { rows, columns } = props;

  return (
    <>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          autoHeight
        />
      </ThemeProvider>
    </>
  );
}
Tabla.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
};
export default Tabla;
