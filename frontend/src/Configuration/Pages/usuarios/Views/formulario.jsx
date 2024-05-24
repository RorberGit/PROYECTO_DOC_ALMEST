import { Alert, Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Formik } from "formik";

import Titles from "../../../Component/Titles";

import { RoutesURL } from "../../../Contants/Routes.contants";
import { useSearchParams } from "react-router-dom";
import { useShowMessage } from "../../../../hooks/useShowMessage";
import { useEffect, useState } from "react";
import useAxiosToken from "./../../../../hooks/useAxiosToken";
import { CampoTexto, AutoCompletar } from "../../../../Component/mui";
import {
  validationSchema,
  initialData,
  initialRoles,
  validationSchemaAdmin,
} from "../resources";

import { useFetch } from "../../../../hooks/useFetch";

import { useReduxUsuario } from "./../../../../redux/hooks/useRedux-Usuario";
import { useRouter } from "./../../../../hooks/use-router";

export default function Formulario() {
  let [searchParams] = useSearchParams();
  const axiosToken = useAxiosToken();

  const router = useRouter();

  const [Message] = useShowMessage();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(initialData);

  const [error, setError] = useState(null);

  const redux = useReduxUsuario();

  const unidades = useFetch(RoutesURL.UNIDADES);
  const cargos = useFetch(RoutesURL.CARGOS);
  const especialidades = useFetch(RoutesURL.ESPECIALIDADES);

  const action = searchParams.get("action");
  const id = searchParams.get("id");

  useEffect(() => {
    if (action === "update") {
      axiosToken
        .get(`${RoutesURL.USUARIOS}/${id}`)
        .then((response) => setData(response.data))
        .catch((error) => {
          console.error("ERROR :>", error);
          setError("A ocurrido un error cargando el usuario");
        })
        .finally(() => setLoading(true));
    } else setLoading(true);
  }, [action, axiosToken, id, searchParams]);

  const initialValues = {
    user: data.user,
    fullname: data.fullname,
    password: "",
    dni: data.dni,
    email: data.email,
    roles: data.roles
      ? initialRoles.find((val) => val.nombre === data.roles)
      : data.roles,
    idunidad: data.unidad_relation,
    idcargo: data.cargo_relation,
    idespecialidad: data.especialidad_relation,
  };

  const handleFormSubmit = async (values) => {
    const body = {
      ...values,
      roles: values.roles.nombre,
      idunidad:
        redux.list.usuario === "administrador"
          ? values.idunidad.id
          : redux.list.idUnidad,
      idcargo: values.idcargo.id,
      idespecialidad: values.idespecialidad.id,
    };

    if (action === "create") {
      await axiosToken
        .post(RoutesURL.USUARIOS, body)
        .then(() => {
          router.push(`/${RoutesURL.ROOT}/${RoutesURL.USUARIOS}`);
          Message(`Usuario ${values.nombre} creada exitosamente`, "success");
        })
        .catch((error) => {
          console.error("error post :>", error);
          console.error("error post message :>", error.response.data.message);
          Message(error.response.data.message[0], "error");
        });
    } else {
      await axiosToken
        .put(`${RoutesURL.USUARIOS}/${id}`, body)
        .then(() => {
          router.push(`/${RoutesURL.ROOT}/${RoutesURL.USUARIOS}`);
          Message(
            `Usuario ${values.nombre} actualizada exitosamente`,
            "success"
          );
        })
        .catch((error) => Message(error.response.data.message, "error"));
    }
  };

  return loading ? (
    <>
      <Titles
        title={action === "create" ? "Crear Usuario" : "Actualizar Usuario"}
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
          validationSchema={
            redux.list.usuario === "administrador"
              ? validationSchemaAdmin
              : validationSchema
          }
        >
          {({
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
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
                  name="user"
                  label="Usuarios"
                  value={values.user}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.user}
                  errors={errors.user}
                  ncol="1"
                />

                <CampoTexto
                  name="fullname"
                  label="Nombre Completo"
                  value={values.fullname}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.fullname}
                  errors={errors.fullname}
                  ncol="2"
                />

                <CampoTexto
                  name="password"
                  type="password"
                  label="Contraseña"
                  value={values.password}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.password}
                  errors={errors.password}
                  ncol="1"
                />

                <CampoTexto
                  name="email"
                  type="email"
                  label="Correo Electrónico"
                  value={values.email}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.email}
                  errors={errors.email}
                  ncol="2"
                />

                <CampoTexto
                  name="dni"
                  label="Número de Identidad"
                  value={values.dni}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.dni}
                  errors={errors.dni}
                  ncol="1"
                />

                <AutoCompletar
                  options={initialRoles}
                  label="Roles"
                  value={values.roles}
                  setFieldValue={setFieldValue}
                  field="roles"
                  handleBlur={handleBlur}
                  touched={touched.roles}
                  errors={errors.roles}
                  ncol="1"
                />

                {unidades.loading
                  ? redux.list.usuario === "administrador" && (
                      <AutoCompletar
                        options={unidades.data}
                        label="Unidad o Departamento"
                        value={values.idunidad}
                        setFieldValue={setFieldValue}
                        field="idunidad"
                        handleBlur={handleBlur}
                        touched={touched.idunidad}
                        errors={errors.idunidad}
                        ncol="2"
                      />
                    )
                  : "...Cargando"}

                <AutoCompletar
                  options={cargos.data}
                  label="Cargo"
                  value={values.idcargo}
                  setFieldValue={setFieldValue}
                  field="idcargo"
                  handleBlur={handleBlur}
                  touched={touched.idcargo}
                  errors={errors.idcargo}
                  ncol="2"
                />

                <AutoCompletar
                  options={especialidades.data}
                  label="Especialidad"
                  value={values.idespecialidad}
                  setFieldValue={setFieldValue}
                  field="idespecialidad"
                  handleBlur={handleBlur}
                  touched={touched.idespecialidad}
                  errors={errors.idespecialidad}
                  ncol="2"
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
