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

const validationSchema = yup.object().shape({
  key: yup.string().required("Campo requerido"),
  name: yup.string().required("Campo requerido"),
});

export default function Edit() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [Message] = useShowMessage();

  const { id } = useParams();

  const [data] = useResultAPI(`${RoutesURL.UNIDADES}/${id}`);

  const [prev, setPrev] = useState([]);

  if (JSON.stringify(data) !== JSON.stringify(prev)) {
    setPrev(() => data);
    setTimeout(() => {
      setIsLoading(() => true);
    }, 200);
  }

  const initialValues = {
    key: data?.key,
    name: data?.name,
  };

  const handleFormSubmit = async (values) => {
    await api
      .put(`${RoutesURL.UNIDADES}/${id}`, values)
      .then((result) => {
        if (result.data.statusCode === 200) {
          Message(
            `Departamento o Unidad ${values.name} actualizado exitosamente`,
            "success"
          );

          navigate(`/${RoutesURL.ROOT}/${RoutesURL.UNIDADES}`, replace);
        }
      })
      .catch((error) => Message(error.response.data.message, "error"));
  };

  return isLoading ? (
    <>
      <Titles title="Editar Departamento / Unidad" />

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
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  name="name"
                  size="small"
                  variant="outlined"
                  label="Departamentos / Unidades"
                  placeholder=""
                  required
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 3" }}
                />
              </Box>

              <Box m={2} display="flex" justifyContent="end">
                <Button type="submit" variant="contained">
                  Actualizar Departamento / Unidad
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
