import { Alert, Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Titles from "../../../Component/Titles";

import { RoutesURL } from "../../../Contants/Routes.contants";
import { useSearchParams } from "react-router-dom";
import { useShowMessage } from "../../../../hooks/useShowMessage";
import { useEffect, useState } from "react";
import useAxiosToken from "../../../../hooks/useAxiosToken";
import CampoTexto from "./../../../../opci/Component/CampoTexto";
import { useRouter } from "../../../../hooks/use-router";

const validationSchema = yup.object().shape({
  key: yup.string().required("Campo requerido"),
  nombre: yup.string().required("Campo requerido"),
});

export default function Formulario() {
  let [searchParams] = useSearchParams();
  const axiosToken = useAxiosToken();

  const router = useRouter();
  const [Message] = useShowMessage();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({ key: "", nombre: "" });
  const [error, setError] = useState(null);

  const action = searchParams.get("action");
  const id = searchParams.get("id");

  useEffect(() => {
    if (action === "update") {
      axiosToken
        .get(`${RoutesURL.TIPO_DOCUMENTOS}/${id}`)
        .then((response) => {
          console.info("type :>", response);
          setData(response.data);
        })
        .catch((error) => {
          console.error("ERROR :>", error);
          setError("A ocurrido un error cargando el Área");
        })
        .finally(() => setLoading(true));
    } else setLoading(true);
  }, [action, axiosToken, id]);

  const initialValues = {
    key: data.key,
    nombre: data.nombre,
  };

  const handleFormSubmit = async (values) => {
    if (action === "create") {
      await axiosToken
        .post(RoutesURL.TIPO_DOCUMENTOS, values)
        .then(() => {
          router.push(`/${RoutesURL.ROOT}/${RoutesURL.TIPO_DOCUMENTOS}`);
          Message(
            `Tipo documento ${values.nombre} creado exitosamente`,
            "success"
          );
        })
        .catch((error) => {
          console.error("error post :>", error);
          Message(error.response.data.message, "error");
        });
    } else {
      await axiosToken
        .put(`${RoutesURL.TIPO_DOCUMENTOS}/${id}`, values)
        .then(() => {
          router.push(`/${RoutesURL.ROOT}/${RoutesURL.TIPO_DOCUMENTOS}`);
          Message(
            `Tipo documento ${values.nombre} actualizado exitosamente`,
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
          action === "create"
            ? "Crear Tipo documento"
            : "Actualizar Tipo documento"
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
                <CampoTexto
                  name="key"
                  label="Clave"
                  value={values.key}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.key}
                  errors={errors.key}
                  ncol="1"
                />

                <CampoTexto
                  name="nombre"
                  label="Tipo documento"
                  value={values.nombre}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.nombre}
                  errors={errors.nombre}
                  ncol="3"
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
