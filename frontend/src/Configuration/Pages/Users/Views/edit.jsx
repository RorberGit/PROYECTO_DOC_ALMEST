import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik, replace } from "formik";
import * as yup from "yup";
import Titles from "../../../Component/Titles";

import { useUnidades } from "../../../hooks/useUnidades";
import { useAreas } from "../../../hooks/useAreas";
import { useCargos } from "../../../hooks/useCargos";
import { useEspecialidades } from "../../../hooks/useEspecialidades";

import api from "../../../../services/axios.service";
import { RoutesURL } from "../../../Contants/Routes.contants";
import { useNavigate, useParams } from "react-router-dom";
import { useShowMessage } from "../../../../hooks/useShowMessage";

import { useResultAPI } from "../../../../hooks/useResultAPI";
import { useState } from "react";

const validationSchema = yup.object().shape({
  user: yup
    .string()
    .matches(
      /^[a-z0-9._-]{4,12}$/,
      "De 4 a 12 caracteres y solo contener letras, números, ., - y _"
    )
    .required("Campo requerido"),
  fullname: yup
    .string()
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*$/, "Solo letras")
    .required("Campo requerido"),
  dni: yup.string().matches(/^[0-9]{11}$/, "11 caracteres y solo números"),
  email: yup.string().email("Dirección de Correo invalidad").lowercase("sasas"),
  roles: yup.string().required("Campo requerido"),
  idunidad: yup.object().nonNullable().required("Campo requerido"),
  idarea: yup.object().nonNullable().required("Campo requerido"),
  idcargo: yup.object().nonNullable().required("Campo requerido"),
  idespecialidad: yup.object().nonNullable().required("Campo requerido"),
});

export default function Edit() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [Message] = useShowMessage();

  const [unidades] = useUnidades();
  const [areas] = useAreas();
  const [cargos] = useCargos();
  const [especialidades] = useEspecialidades();

  const { id } = useParams();

  const [data] = useResultAPI(`${RoutesURL.USERS}/${id}`);

  const [prev, setPrev] = useState([]);

  if (JSON.stringify(data) !== JSON.stringify(prev)) {
    setPrev(() => data);
    setTimeout(() => {
      setIsLoading(() => true);
    }, 200);
  }

  const initialValues = {
    user: data?.user,
    fullname: data?.fullname,
    password: "",
    dni: data?.dni,
    email: data?.email,
    roles: data?.roles,
    idunidad: {
      id: data?.unidad?.id,
      label: data?.unidad?.name,
    },
    idarea: {
      id: data?.idarea?.id,
      label: data?.idarea?.areas,
    },
    idcargo: {
      id: data?.idcargo?.id,
      label: data?.idcargo?.cargos,
    },
    idespecialidad: {
      id: data?.idespecialidad?.id,
      label: data?.idespecialidad?.especialidades,
    },
  };

  const dataUnidades = unidades.map((row) => ({
    id: row?.id,
    label: row?.name,
  }));

  const dataAreas = areas.map((row) => ({
    id: row?.id,
    label: row?.areas,
  }));

  const dataCargos = cargos.map((row) => ({
    id: row?.id,
    label: row?.cargos,
  }));

  const dataEspecialidades = especialidades.map((row) => ({
    id: row?.id,
    label: row?.especialidades,
  }));

  const handleFormSubmit = async (values) => {
    const saveValues = {
      user: values.user,
      fullname: values.fullname,
      password: values.password,
      dni: values.dni,
      email: values.email,
      roles: values.roles,
      idunidad: values.idunidad.id,
      idarea: values.idarea.id,
      idcargo: values.idcargo.id,
      idespecialidad: values.idespecialidad.id,
    };

    if (initialValues.password === saveValues.password) {
      delete saveValues.password;
    }

    console.log("init", initialValues);
    console.log("values", values);
    console.log("save values", saveValues);

    await api
      .put(`${RoutesURL.USERS}/${id}`, saveValues)
      .then((result) => {
        if (result.data.statusCode === 200) {
          Message(
            `Usuario ${saveValues.user} actualizado exitosamente`,
            "success"
          );

          navigate("/config/users", replace);
        }
      })
      .catch((error) => Message(error.response.data.message, "error"));
  };

  return isLoading ? (
    <>
      <Titles
        title="Editar Usuario"
        subtitle="Actualizar las propiedades del usuario"
      />

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
                  name="user"
                  size="small"
                  variant="outlined"
                  label="Usuario"
                  placeholder="jlozadal"
                  required
                  disabled
                  value={values.user}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.user && !!errors.user}
                  helperText={touched.user && errors.user}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  name="fullname"
                  size="small"
                  variant="outlined"
                  label="Nombre Completo"
                  placeholder="José Angel Lozada Legrá"
                  required
                  value={values.fullname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.fullname && !!errors.fullname}
                  helperText={touched.fullname && errors.fullname}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  name="password"
                  type="password"
                  size="small"
                  variant="outlined"
                  label="Contraseña"
                  placeholder="Wnr.23+T"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  name="email"
                  type="email"
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Correo Electrónico"
                  placeholder="jlozadal@almest.cu"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  name="dni"
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Número de Identidad"
                  placeholder="70080124001"
                  value={values.dni}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.dni && !!errors.dni}
                  helperText={touched.dni && errors.dni}
                  sx={{ gridColumn: "span 1" }}
                />

                <FormControl
                  required
                  size="small"
                  error={!!touched.roles && !!errors.roles}
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel id="LabelRoles">Roles</InputLabel>
                  <Select
                    labelId="LabelRoles"
                    id="roles"
                    name="roles"
                    label="Roles"
                    value={values.roles}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value={"admin"}>Administrador</MenuItem>
                    <MenuItem value={"editor"}>Editor</MenuItem>
                    <MenuItem value={"ejecutor"}>Ejecutor</MenuItem>
                  </Select>
                  <FormHelperText>
                    {touched.roles && errors.roles}
                  </FormHelperText>
                </FormControl>

                <Autocomplete
                  disablePortal
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue.id;
                  }}
                  value={values.idunidad}
                  defaultValue={values.idunidad}
                  onChange={(event, value) => (values.idunidad = value)}
                  options={dataUnidades}
                  size="small"
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Unidad o Departamento"
                      name="idunidad"
                      required
                      onBlur={handleBlur}
                      error={!!touched.idunidad && !!errors.idunidad}
                      helperText={touched.idunidad && errors.idunidad}
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue.id;
                  }}
                  value={values.idarea}
                  defaultValue={values.idarea}
                  onChange={(event, value) => (values.idarea = value)}
                  options={dataAreas}
                  size="small"
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Área"
                      name="idarea"
                      required
                      onBlur={handleBlur}
                      error={!!touched.idarea && !!errors.idarea}
                      helperText={touched.idarea && errors.idarea}
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue.id;
                  }}
                  value={values.idcargo}
                  defaultValue={values.idcargo}
                  onChange={(event, value) => (values.idcargo = value)}
                  options={dataCargos}
                  size="small"
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cargo"
                      name="idcargo"
                      required
                      onBlur={handleBlur}
                      error={!!touched.idcargo && !!errors.idcargo}
                      helperText={touched.idcargo && errors.idcargo}
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, newValue) => {
                    return option.id === newValue.id;
                  }}
                  value={values.idespecialidad}
                  defaultValue={values.idespecialidad}
                  onChange={(event, value) => (values.idespecialidad = value)}
                  options={dataEspecialidades}
                  size="small"
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Especialidad"
                      name="idespecialidad"
                      required
                      onBlur={handleBlur}
                      error={
                        !!touched.idespecialidad && !!errors.idespecialidad
                      }
                      helperText={
                        touched.idespecialidad && errors.idespecialidad
                      }
                    />
                  )}
                />
              </Box>

              <Box m={2} display="flex" justifyContent="end">
                <Button type="submit" variant="contained">
                  Actualizar usuario
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
