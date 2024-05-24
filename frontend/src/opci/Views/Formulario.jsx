import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";

import { Formik } from "formik";

import Titles from "../../Component/Titles";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { v4 as uuid } from "uuid";

import {
  CrearRegistro,
  ObtenerConsecutivo,
  PostTrazas,
  UploadsFiles,
} from "../Utilities";

import { AutoCompletar, CampoTexto, Archivos, Fecha } from "../Component";
import { useSearchParams } from "react-router-dom";
import { RoutesURLRoot } from "../../contants";

import dayjs from "dayjs";

import { useShowMessage } from "../../hooks/useShowMessage";
import { useFetch, useRouter } from "../../hooks";
import { initialData, initialEstado, validation_OPCI } from "../resources";

import useAxiosToken from "../../hooks/useAxiosToken";

export default function Formulario() {
  let [searchParams] = useSearchParams();

  const action = searchParams.get("action");
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const [files, setFiles] = useState([]);

  const router = useRouter();
  const [Message] = useShowMessage();

  const [data, setData] = useState(initialData);

  const axiosToken = useAxiosToken();

  const tipodoc = useFetch(RoutesURLRoot.TIPODOC);
  const clasificacion = useFetch(RoutesURLRoot.DOCCLASIFICACION);
  const procedencia = useFetch(RoutesURLRoot.PROCEDENCIA);
  const destino = useFetch(RoutesURLRoot.DESTINO);
  const unidades = useFetch(RoutesURLRoot.UNIDADES);

  const ColocarFiles = (value) => {
    if (value.length)
      setFiles(value.map((item) => ({ id: uuid(), name: item })));
  };

  useEffect(() => {
    if (action === "update") {
      axiosToken
        .get(`${RoutesURLRoot.OPCI}/find/${id}`)
        .then((response) => {
          ColocarFiles(response.data.file);
          setData(response.data);
        })
        .catch((error) => console.error("error :>", error))
        .finally(() => setLoading(true));
    } else setLoading(true);
  }, [action, axiosToken, id]);

  const initialValues = {
    codigo: data.codigo,
    estado: data.estado
      ? initialEstado.find((item) => item.nombre === data.estado)
      : data.estado,
    procedencia: data.procedencia,
    destino: data.destino,
    unidades: data.unidades,
    descripcion: data.descripcion,
    idClasificacion: data.clasificacion_relation,
    idTipoDocumento: data.tipodocumento_relation,
    fecha: data.fecha ? dayjs(data?.fecha) : data.fecha,
    file: [],
    nota: data.nota,
  };

  const addFiles = (file) => {
    setFiles((old) => [
      ...old,
      { id: uuid(), name: file[0]?.name, file: file[0] },
    ]);
  };

  const deleteFiles = (id) => {
    setFiles((old) => old.filter((item) => item.id !== id));
  };

  //funsion del submit
  const HandleFormSubmit = async (values) => {
    console.log("datos :>", values);
    //const consecutivo = await ObtenerConsecutivo();
    const registro = CrearRegistro(values, files, await ObtenerConsecutivo());

    console.log("registro :>> ", registro);

    //Uploads Archivos
    if (values.file.length) {
      await UploadsFiles(files).then(() => {
        Message("Archivos enviados exitosamente", "success");
      });
    }

    if (action === "create") {
      //Insertar----------------------------
      axiosToken
        .post(RoutesURLRoot.OPCI, registro)
        .then(async (response) => {
          Message("Registro agregado exitosamente", "success");

          //Salva de trazas de las acciones
          await PostTrazas(action, response.data.data.id, user);

          //Redirigir la URL
          router.push(`/${RoutesURLRoot.OPCI}`);
        })
        .catch((error) => {
          console.error("error :>", error);
          if (error.response)
            Message(
              `${error?.response?.data?.error}: ${error?.response?.data?.cause?.detail}`,
              "error"
            );
        });
    } else {
      //Editar------------------------------

      //Eliminar valor de conteo
      delete registro.conteo;

      axiosToken
        .put(`${RoutesURLRoot.OPCI}/${id}`, registro)
        .then(async (response) => {
          Message("Registro actualizado exitosamente", "success");

          //Salva de trazas de las acciones
          await PostTrazas(action, response.data.data.id, user);

          router.push(`/${RoutesURLRoot.OPCI}`);
        })
        .catch((error) => {
          console.error("error :>", error);

          if (error.response)
            Message(
              `${error?.response?.data?.error}: ${error?.response?.data?.cause?.detail}`,
              "error"
            );
        });
    }
  };

  return loading ? (
    <>
      <Titles
        title={
          action === "create"
            ? "Crear Registro de Documentos"
            : "Actualizar registros"
        }
        subtitle={
          action === "create"
            ? "Crear un nuevo registro documental"
            : "Editar registros de documentos OPCI"
        }
      />

      <Box>
        <Formik
          onSubmit={HandleFormSubmit}
          initialValues={initialValues}
          validationSchema={validation_OPCI}
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
                gridTemplateColumns="repeat(12, 1fr)"
              >
                {/*Estado */}
                <AutoCompletar
                  options={initialEstado}
                  label="Tipo de registro"
                  value={values.estado}
                  setFieldValue={setFieldValue}
                  field="estado"
                  handleBlur={handleBlur}
                  touched={touched.estado}
                  errors={errors.estado}
                  ncol="2"
                />

                {/*Tipo de Documentos */}
                {tipodoc.loading && (
                  <AutoCompletar
                    options={tipodoc.data}
                    label="Tipo de documento"
                    value={values.idTipoDocumento}
                    setFieldValue={setFieldValue}
                    field="idTipoDocumento"
                    handleBlur={handleBlur}
                    touched={touched.idTipoDocumento}
                    errors={errors.idTipoDocumento}
                    ncol="5"
                  />
                )}

                {/*Clasificacion de Documentos */}
                {clasificacion.loading && (
                  <AutoCompletar
                    options={clasificacion.data}
                    label="Clasificación"
                    value={values.idClasificacion}
                    setFieldValue={setFieldValue}
                    field="idClasificacion"
                    handleBlur={handleBlur}
                    touched={touched.idClasificacion}
                    errors={errors.idClasificacion}
                    ncol="5"
                  />
                )}

                {/*Descripción*/}
                <CampoTexto
                  name="descripcion"
                  label="Asunto"
                  value={values.descripcion}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.descripcion}
                  errors={errors.descripcion}
                  ncol="12"
                />

                {/* Procedencia */}

                {procedencia.loading && (
                  <AutoCompletar
                    multiple={true}
                    options={procedencia.data}
                    label="Procedencia"
                    value={values.procedencia}
                    setFieldValue={setFieldValue}
                    field="procedencia"
                    handleBlur={handleBlur}
                    touched={touched.procedencia}
                    errors={errors.procedencia}
                    ncol="4"
                  />
                )}

                {/* Registro de Procedencia */}
                <CampoTexto
                  name="codigo"
                  label="Registro de Procedencia"
                  value={values.codigo}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.codigo}
                  errors={errors.codigo}
                  ncol="2"
                />

                {/* Fecha */}
                <Fecha
                  label="Fecha de procedencia"
                  value={values.fecha}
                  setFieldValue={setFieldValue}
                  field="fecha"
                  touched={touched.fecha}
                  errors={errors.fecha}
                  ncol="2"
                />

                {/*Destino*/}
                {destino.loading && (
                  <AutoCompletar
                    multiple={true}
                    options={destino.data}
                    label="Destino"
                    value={values.destino}
                    setFieldValue={setFieldValue}
                    field="destino"
                    handleBlur={handleBlur}
                    touched={touched.destino}
                    errors={errors.destino}
                    ncol="4"
                  />
                )}

                {/**Nota */}
                <CampoTexto
                  name="nota"
                  label="Nota"
                  value={values.nota}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.nota}
                  errors={errors.nota}
                  ncol="12"
                  multiline
                  rows={2}
                />

                {/* Departamento */}
                {unidades.loading && (
                  <AutoCompletar
                    multiple={true}
                    options={unidades.data}
                    label="Visto en áreas"
                    value={values.unidades}
                    setFieldValue={setFieldValue}
                    field="unidades"
                    handleBlur={handleBlur}
                    touched={touched.unidades}
                    errors={errors.unidades}
                    ncol="12"
                  />
                )}

                {/**File */}
                <TextField
                  type="file"
                  size="small"
                  onChange={(value) => {
                    setFieldValue("file", [
                      ...values.file,
                      value.target.files[0].name,
                    ]);

                    addFiles(value.target.files);
                  }}
                  sx={{ gridColumn: "span 12" }}
                />
              </Box>

              <Box m={2} display="flex" justifyContent="end">
                <Button type="submit" variant="contained">
                  {action === "create"
                    ? "Crear nuevo registro"
                    : "Actualizar registro"}
                </Button>
              </Box>

              <Archivos files={files} deleteFiles={deleteFiles} />
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
