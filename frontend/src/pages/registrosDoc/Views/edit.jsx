import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Titles from "../../../Component/Titles";

import { RoutesURLRoot } from "../../../contants/routes.constans";
import { useParams } from "react-router-dom";
import { useShowMessage } from "../../../hooks/useShowMessage";
import { useState } from "react";
import axios from "../../../api/axios";
import { useRouter } from "./../../../hooks/use-router";

const validationSchema = yup.object().shape({
  especialidades: yup.string().required("Campo requerido"),
});

export default function Edit() {
  const [isLoading] = useState(false);
  const router = useRouter();
  const [Message] = useShowMessage();

  const { id } = useParams();

  //const [especialidad] = useEspecialidadById(id);

  //probicional

  const initialValues = {
    especialidades: null,
  };

  /*
  const initialValues = {
    especialidades: especialidad.especialidades
      ? especialidad.especialidades
      : "",
  };

  useEffect(() => {
    if (especialidad.id) {
      setTimeout(() => {
        setIsLoading(() => true);
      }, 200);
    }
  }, [especialidad]);
*/
  const handleFormSubmit = async (values) => {
    await axios
      .put(`${RoutesURLRoot.ESPECIALIDADES}/${id}`, values)
      .then((result) => {
        if (result.data.statusCode === 200) {
          Message(
            `Especialidad ${values.especialidades} actualizado exitosamente`,
            "success"
          );

          router.push(`/${RoutesURLRoot.ROOT}/${RoutesURLRoot.ESPECIALIDADES}`);
        }
      })
      .catch((error) => Message(error.response.data.message, "error"));
  };

  return isLoading ? (
    <>
      <Titles title="Editar Especialidad" />

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
                  name="especialidades"
                  size="small"
                  variant="outlined"
                  label="Especialidad"
                  placeholder=""
                  required
                  value={values.especialidades}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.especialidades && !!errors.especialidades}
                  helperText={touched.especialidades && errors.especialidades}
                  sx={{ gridColumn: "span 3" }}
                />
              </Box>

              <Box m={2} display="flex" justifyContent="end">
                <Button type="submit" variant="contained">
                  Actualizar Especialidad
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
