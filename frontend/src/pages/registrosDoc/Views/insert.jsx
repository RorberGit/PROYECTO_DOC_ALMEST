import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Titles from "../../../Component/Titles";

import { RoutesURLRoot } from "../../../contants";

import { useShowMessage } from "../../../hooks/useShowMessage";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RoutesURL } from "../../../Configuration/Contants/Routes.contants";

//import bunyan from "bunyan";
import axios from "./../../../api/axios";
import { useRouter } from "../../../hooks/use-router";

export default function Insert() {
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user);

  const router = useRouter();
  const [Message] = useShowMessage();

  const [clasificacion, setClasificacion] = useState([]);
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const [clasificacionResult, unidadesResult] = await Promise.all([
          axios.get(RoutesURL.DOCCLASIFICACION),
          axios.get(RoutesURL.UNIDADES),
        ]);

        const clasificacionValue = clasificacionResult.data.data;
        const unidadesValue = unidadesResult.data.data;

        if (!ignore) {
          setClasificacion(() => clasificacionValue);
          setUnidades(() => unidadesValue);
        }
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const initialValues = {
    descripcion: "",
    idunidad: null,
    idClasificacion: null,
    destino: [],
    file: "",
  };

  const validationSchema = yup.object().shape({
    descripcion: yup.string().required("Campo requerido"),
    idClasificacion: yup.object().nonNullable().required("Campo requerido"),
    destino: yup.array().min(1, "Campo requerido"),
    //file: yup.string().required("Campo requerido"),
  });

  const getFormattedDate = () => {
    const date = new Date(Date.now());

    return {
      day: date.toLocaleDateString("es-ES", { day: "2-digit" }),
      month: date.toLocaleDateString("es-ES", { month: "2-digit" }),
      year: date.toLocaleDateString("es-ES", { year: "numeric" }),
    };
  };

  const formattedDate = getFormattedDate();

  const getConscData = async (idUnidad, year) => {
    try {
      const response = await axios.get(
        `${RoutesURLRoot.REGISTROS}/${idUnidad}/${year}`
      );
      return response.data;
    } catch (error) {
      Message(error.response.data.message, "error");
    }
  };

  const generateCodigo = (values, user, conscData) => {
    const { idClasificacion } = { ...values };
    const { keyUnidad } = user;
    const data = conscData;
    const year = String(new Date().getFullYear()).slice(-2);
    const generateCode = `${idClasificacion.key}.${keyUnidad}.${data}.${year}`;
    return generateCode;
  };

  const createRegistro = (values, user, conscData) => {
    const { descripcion, destino, idClasificacion, file } = { ...values };
    const { idUnidad, idUsuario } = user;
    const data = conscData;
    const { day, month, year } = formattedDate;

    return {
      descripcion,
      conteo: data,
      codigo: generateCodigo(values, user, conscData),
      fecha: `${year}-${month}-${day}`,
      year,
      idUnidad,
      idUsuario,
      idClasificacion: idClasificacion.id,
      destino: destino.map((row) => row.id),
      file: file ? file[0].name : "",
      estado: "Por aprobar",
      ordenf: 0,
    };
  };

  //funsion del submit
  const HandleFormSubmit = async (values) => {
    try {
      const { idUnidad } = user;
      const { year } = formattedDate;
      const conscData = await getConscData(idUnidad, year);
      const registro = createRegistro(values, user, conscData);

      const result = await axios.post(RoutesURLRoot.REGISTROS, registro);

      if (result.data.statusCode === 200) {
        if (values.file) {
          let fFile = new FormData();
          fFile.append("file", values.file[0], values.file[0].name);

          const resultFile = await axios.post(
            `${RoutesURLRoot.APIURL}/${RoutesURLRoot.UPLOAD}`,
            fFile,
            {
              Headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (resultFile.data.statusCode === 200) {
            Message(resultFile.data.message, "success");
          }
        }

        Message(`Registro agregado exitosamente`, "success");
        router.push(`/${RoutesURLRoot.REGISTROS}`);
      } else {
        Message(`Error: ${result?.data?.message}`, "error");
      }
    } catch (error) {
      Message(error?.response?.data?.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <>
      <Titles
        title="Crear Registro de Documentos"
        subtitle="Crear un nuevo registro documental"
      />

      <Box>
        <Formik
          onSubmit={HandleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            touched,
            errors,
            setFieldValue,
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
                  name="descripcion"
                  size="small"
                  variant="outlined"
                  label="Descripción"
                  required
                  value={values.descripcion}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.descripcion && !!errors.descripcion}
                  helperText={touched.descripcion && errors.descripcion}
                  sx={{ gridColumn: "span 4" }}
                />

                <Autocomplete
                  disablePortal
                  options={clasificacion}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined ||
                    value === "" ||
                    option.id === value.id
                  }
                  value={values.idClasificacion}
                  defaultValue={values.idClasificacion}
                  onChange={(event, value) =>
                    setFieldValue("idClasificacion", value)
                  }
                  size="small"
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Clasificación de Documentos"
                      required
                      onBlur={handleBlur}
                      error={
                        !!touched.idClasificacion && !!errors.idClasificacion
                      }
                      helperText={
                        touched.idClasificacion && errors.idClasificacion
                      }
                    />
                  )}
                />

                <Autocomplete
                  multiple
                  id="destino"
                  options={unidades}
                  getOptionLabel={(option) => option.name}
                  value={values.destino}
                  defaultValue={values.destino}
                  onChange={(event, value) => setFieldValue("destino", value)}
                  size="small"
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="con destino a"
                      onBlur={handleBlur}
                      error={!!touched.destino && !!errors.destino}
                      helperText={touched.destino && errors.destino}
                    />
                  )}
                />
                <TextField
                  type="file"
                  size="small"
                  onChange={(value) =>
                    setFieldValue("file", value.target.files)
                  }
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>

              <Box m={2} display="flex" justifyContent="end">
                <Button type="submit" variant="contained">
                  Crear nuevo registro
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
