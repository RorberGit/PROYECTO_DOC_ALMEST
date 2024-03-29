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
  cargos: "",
};

const validationSchema = yup.object().shape({
  cargos: yup.string().required("Campo requerido"),
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
      .post(RoutesURL.CARGOS, values)
      .then((result) => {
        if (result.data.statusCode === 200) {
          Message(`Cargo ${values.cargos} agregado exitosamente`, "success");

          navigate(`/${RoutesURL.ROOT}/${RoutesURL.CARGOS}`, replace);
        }
      })
      .catch((error) => Message(error.response.data.message, "error"));
  };

  return isLoading ? (
    <>
      <Titles title="Crear Cargo" />

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
                  name="cargos"
                  size="small"
                  variant="outlined"
                  label="Cargo"
                  placeholder=""
                  required
                  value={values.cargos}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.cargos && !!errors.cargos}
                  helperText={touched.cargos && errors.cargos}
                  sx={{ gridColumn: "span 3" }}
                />
              </Box>

              <Box m={2} display="flex" justifyContent="end">
                <Button type="submit" variant="contained">
                  Crear Nuevo Cargo
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
