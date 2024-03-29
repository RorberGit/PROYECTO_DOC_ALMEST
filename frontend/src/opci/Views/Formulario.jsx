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
  FetchData,
  FetchID,
  ObtenerConsecutivo,
  PostTrazas,
  UploadsFiles,
} from "../Utilities";

import { AutoCompletar, CampoTexto, Archivos, Fecha } from "../Component";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RoutesURLRoot } from "../../contants";

import { FIELD_ESTADO, validation_OPCI } from "../Contants";

import dayjs from "dayjs";
import { api } from "../../services";
import { useShowMessage } from "../../hooks/useShowMessage";

export default function Formulario() {
  let [searchParams] = useSearchParams();

  const action = searchParams.get("action");
  const id = searchParams.get("id");

  const [loadingV, setLoadingV] = useState(false);
  const [loadingC, setLoadingC] = useState(false);
  const [loadingU, setLoadingU] = useState(false);

  const user = useSelector((state) => state.user);

  const [clasificacion, setClasificacion] = useState([]);

  const [procedencia, setProcedencia] = useState([]);
  const [destino, setDestino] = useState([]);

  const [departamento, setDepartamento] = useState([]);
  const [tipodoc, setTipoDoc] = useState([]);

  const [files, setFiles] = useState([]);

  const [prev, setPrev] = useState([]);

  const navigate = useNavigate();
  const [Message] = useShowMessage();

  if (action === "update") {
    const { data, loading } = FetchID(`${RoutesURLRoot.OPCI}/find/${id}`);

    if (JSON.stringify(data) !== JSON.stringify(prev)) {
      setPrev(data);

      if (data?.file) {
        const temp = data?.file.map((item) => ({ id: uuid(), name: item }));

        setFiles(temp);
      }

      if (loading) setLoadingU(loading);
    }
  }

  const initialValues = {
    codigo: action === "insert" ? "" : prev?.codigo,
    estado:
      action === "insert"
        ? null
        : FIELD_ESTADO.filter((item) => item.nombre === prev?.estado)[0],
    procedencia: action === "insert" ? [] : prev?.procedencia,
    destino: action === "insert" ? [] : prev?.destino,
    departamentos: action === "insert" ? [] : prev?.departamentos,
    descripcion: action === "insert" ? "" : prev?.descripcion,
    idClasificacion:
      action === "insert" ? null : prev?.ClasificacionDocumento_relation,
    idTipoDoc: action === "insert" ? null : prev?.tipodocumento_relation,
    fecha:
      action === "insert"
        ? null
        : prev?.fecha === null
        ? null
        : dayjs(prev?.fecha),
    file: [],
    nota: action === "insert" ? "" : prev?.nota,
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

  useEffect(() => {
    const Fetch = async () =>
      FetchData(
        setClasificacion,
        setProcedencia,
        setDestino,
        setDepartamento,
        setTipoDoc,
        setLoadingC
      );

    Fetch();
  }, []);

  useEffect(() => {
    if (loadingC) {
      if (action === "update") {
        if (loadingU) setLoadingV(true);
      } else setLoadingV(true);
    }
  }, [action, loadingC, loadingU]);

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

    if (action === "insert") {
      //Insertar----------------------------
      await api
        .post(RoutesURLRoot.OPCI, registro)
        .then(async (response) => {
          Message("Registro agregado exitosamente", "success");

          //Salva de trazas de las acciones
          await PostTrazas(action, response.data.data.id, user);

          //Redirigir la URL
          navigate(`/${RoutesURLRoot.OPCI}`, { replace: true });
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

      await api
        .put(`${RoutesURLRoot.OPCI}/${id}`, registro)
        .then(async (response) => {
          Message("Registro actualizado exitosamente", "success");

          //Salva de trazas de las acciones
          await PostTrazas(action, response.data.data.id, user);

          navigate(`/${RoutesURLRoot.OPCI}`, { replace: true });
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

  return loadingV ? (
    <>
      <Titles
        title={
          action === "insert"
            ? "Crear Registro de Documentos"
            : "Actualizar registros"
        }
        subtitle={
          action === "insert"
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
                  options={FIELD_ESTADO}
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
                <AutoCompletar
                  options={tipodoc}
                  label="Tipo de documento"
                  value={values.idTipoDoc}
                  setFieldValue={setFieldValue}
                  field="idTipoDoc"
                  handleBlur={handleBlur}
                  touched={touched.idTipoDoc}
                  errors={errors.idTipoDoc}
                  ncol="5"
                />

                {/*Clasificacion de Documentos */}
                <AutoCompletar
                  options={clasificacion}
                  label="Clasificación"
                  value={values.idClasificacion}
                  setFieldValue={setFieldValue}
                  field="idClasificacion"
                  handleBlur={handleBlur}
                  touched={touched.idClasificacion}
                  errors={errors.idClasificacion}
                  ncol="5"
                />

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
                <AutoCompletar
                  multiple={true}
                  options={procedencia}
                  label="Procedencia"
                  value={values.procedencia}
                  setFieldValue={setFieldValue}
                  field="procedencia"
                  handleBlur={handleBlur}
                  touched={touched.procedencia}
                  errors={errors.procedencia}
                  ncol="4"
                />

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
                <AutoCompletar
                  multiple={true}
                  options={destino}
                  label="Destino"
                  value={values.destino}
                  setFieldValue={setFieldValue}
                  field="destino"
                  handleBlur={handleBlur}
                  touched={touched.destino}
                  errors={errors.destino}
                  ncol="4"
                />

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
                <AutoCompletar
                  multiple={true}
                  options={departamento}
                  label="Visto en áreas"
                  value={values.departamentos}
                  setFieldValue={setFieldValue}
                  field="departamentos"
                  handleBlur={handleBlur}
                  touched={touched.departamentos}
                  errors={errors.departamentos}
                  ncol="12"
                />

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
                  {action === "insert"
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
      open={!loadingV}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
