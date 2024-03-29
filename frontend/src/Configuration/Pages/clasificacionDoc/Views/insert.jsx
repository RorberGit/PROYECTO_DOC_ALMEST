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
import { useNavigate } from "react-router-dom";
import { useShowMessage } from "../../../../hooks/useShowMessage";
import { useState } from "react";

const initialValues = {
  key: "",
  name: "",
};

const validationSchema = yup.object().shape({
  key: yup
    .string()
    .matches(
      /^[A-Z]{3,4}$/,
      "De 3 a 4 caracteres y solo contener letras mayúsculas"
    )
    .required("Campo requerido"),
  name: yup.string().required("Campo requerido"),
});

export default function Insert() {
  const navigate = useNavigate();
  const [Message] = useShowMessage();

  const [isLoading, setIsLoading] = useState(false);

  if (!isLoading) {
    setTimeout(() => {
      setIsLoading(() => true);
    }, 200);
  }

  const handleFormSubmit = async (values) => {
    await api
      .post(RoutesURL.DOCCLASIFICACION, values)
      .then((result) => {
        if (result.data.statusCode === 200) {
          Message(
            `Clasificación ${values.name} agregada exitosamente`,
            "success"
          );

          navigate(`/${RoutesURL.ROOT}/${RoutesURL.DOCCLASIFICACION}`, replace);
        }
      })
      .catch((error) => Message(error?.response?.data?.message, "error"));
  };

  return isLoading ? (
    <>
      <Titles title="Crear Clasificación de Documentos" />

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
                  name="key"
                  size="small"
                  variant="outlined"
                  label="Clave"
                  placeholder=""
                  required
                  value={values.key}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.key && !!errors.key}
                  helperText={touched.key && errors.key}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  name="name"
                  size="small"
                  variant="outlined"
                  label="Clasificación"
                  placeholder=""
                  required
                  value={values.clasificacion}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>

              <Box m={2} display="flex" justifyContent="end">
                <Button type="submit" variant="contained">
                  Crear Nueva Clasificación
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
