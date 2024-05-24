import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Titles from "../../../Component/Titles";

import { RoutesURL } from "../../../Contants/Routes.contants";
import { useSearchParams } from "react-router-dom";
import { useShowMessage } from "../../../../hooks/useShowMessage";
import { useEffect, useState } from "react";
import useAxiosToken from "./../../../../hooks/useAxiosToken";
import { useRouter } from "./../../../../hooks/use-router";

const validationSchema = yup.object().shape({
  nombre: yup.string().required("Campo requerido"),
});

export default function Formulario() {
  let [searchParams] = useSearchParams();
  const axiosToken = useAxiosToken();

  const router = useRouter();
  const [Message] = useShowMessage();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState("");
  const [error, setError] = useState(null);

  const action = searchParams.get("action");
  const id = searchParams.get("id");

  useEffect(() => {
    if (action === "update") {
      axiosToken
        .get(`${RoutesURL.PROCEDENCIA}/${id}`)
        .then((response) => setData(response.data.nombre))
        .catch((error) => {
          console.error("ERROR :>", error);
          setError("A ocurrido un error cargando la procedencia");
        })
        .finally(() => setLoading(true));
    } else setLoading(true);
  }, [action, axiosToken, id, searchParams]);

  const initialValues = {
    nombre: data,
  };

  const handleFormSubmit = async (values) => {
    if (action === "create") {
      await axiosToken
        .post(RoutesURL.PROCEDENCIA, values)
        .then(() => {
          router.push(`/${RoutesURL.ROOT}/${RoutesURL.PROCEDENCIA}`);
          Message(
            `Procedencia ${values.nombre} creada exitosamente`,
            "success"
          );
        })
        .catch((error) => {
          console.error("error post :>", error);
          Message(error.response.data.message, "error");
        });
    } else {
      await axiosToken
        .put(`${RoutesURL.PROCEDENCIA}/${id}`, values)
        .then(() => {
          router.push(`/${RoutesURL.ROOT}/${RoutesURL.PROCEDENCIA}`);
          Message(
            `Procedencia ${values.nombre} actualizada exitosamente`,
            "success"
          );
        })
        .catch((error) => Message(error.response.data.message, "error"));
    }
  };

  return loading ? (
    <>
      <Titles
        title={
          action === "create" ? "Crear Procedencia" : "Actualizar Procedencia"
        }
      />
      {error && (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      )}
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
                  label="Procedencia"
                  placeholder=""
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
                  {action === "create" ? "Crear" : "Actualizar"}
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
      open={!loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
