import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Formik, replace } from "formik";
import * as yup from "yup";
import Titles from "../../../Component/Titles";

import api from "../../../../services/axios.service";
import { RoutesURL } from "../../../Contants/Routes.contants";
import { useNavigate, useParams } from "react-router-dom";
import { useShowMessage } from "../../../../hooks/useShowMessage";

import { useState } from "react";
import { useResultAPI } from "../../../../hooks/useResultAPI";

export default function Edit() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [Message] = useShowMessage();

  const { id } = useParams();
  const [data] = useResultAPI(`${RoutesURL.OTRASENTIDADES}/${id}`);

  const [prev, setPrev] = useState([]);

  if (JSON.stringify(data) !== JSON.stringify(prev)) {
    setPrev(() => data);
    setTimeout(() => {
      setIsLoading(() => true);
    }, 200);
  }

  const initialValues = {
    nombre: data?.nombre,
  };

  const validationSchema = yup.object().shape({
    nombre: yup.string().required("Campo requerido"),
  });

  const handleFormSubmit = async (values) => {
    await api
      .put(`${RoutesURL.OTRASENTIDADES}/${id}`, values)
      .then((result) => {
        if (result.data.statusCode === 200) {
          Message(
            `Entidad ${values.nombre} actualizado exitosamente`,
            "success"
          );

          navigate(`/${RoutesURL.ROOT}/${RoutesURL.OTRASENTIDADES}`, replace);
        }
      })
      .catch((error) => Message(error?.response?.data?.message, "error"));
  };

  return isLoading ? (
    <>
      <Titles title="Editar Entidad" />

      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="10px"
                m={2}
                gridTemplateColumns="Repeat(4,minmax(0, 1fr))"
                sx={{ "& > div": "span 4" }}
              >
                <TextField
                  name="nombre"
                  size="small"
                  variant="outlined"
                  label="Nombre"
                  placeholder=""
                  required
                  value={values.nombre}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.nombre && !!errors.nombre}
                  helperText={touched.nombre && errors.nombre}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>

              <Box m={2} display="flex" justifyContent="end">
                <Button type="submit" variant="contained">
                  Actualizar Entidad
                </Button>
              </Box>
            </form>
          )}
        </Formik>
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
