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
  cargo: yup.string().required("Campo requerido"),
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
        .get(`${RoutesURL.CARGOS}/${id}`)
        .then((response) => setData(response.data.nombre))
        .catch((error) => {
          console.error("ERROR :>", error);
          setError("A ocurrido un error cargando el Cargo");
        })
        .finally(() => setLoading(true));
    } else setLoading(true);
  }, [action, axiosToken, id, searchParams]);

  const initialValues = {
    cargo: data,
  };

  const handleFormSubmit = async (values) => {
    const body = { nombre: values.cargo };
    if (action === "create") {
      await axiosToken
        .post(RoutesURL.CARGOS, body)
        .then(() => {
          router.push(`/${RoutesURL.ROOT}/${RoutesURL.CARGOS}`);
          Message(`Cargo ${values.cargo} creado exitosamente`, "success");
        })
        .catch((error) => {
          console.error("error post :>", error);
          Message(error.response.data.message, "error");
        });
    } else {
      await axiosToken
        .put(`${RoutesURL.CARGOS}/${id}`, body)
        .then(() => {
          router.push(`/${RoutesURL.ROOT}/${RoutesURL.CARGOS}`);
          Message(`Cargo ${values.cargo} actualizado exitosamente`, "success");
        })
        .catch((error) => Message(error.response.data.message, "error"));
    }
  };

  return loading ? (
    <>
      <Titles
        title={action === "create" ? "Crear Cargo" : "Actualizar Cargo"}
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
                  name="cargo"
                  size="small"
                  variant="outlined"
                  label="Cargo"
                  placeholder=""
                  value={values.cargo}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.cargo && !!errors.cargo}
                  helperText={touched.cargo && errors.cargo}
                  sx={{ gridColumn: "span 3" }}
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