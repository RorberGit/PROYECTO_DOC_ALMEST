import * as yup from "yup";

export const validationSchema = yup.object().shape({
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
    roles: yup.object().nonNullable().required("Campo requerido"),        
    idcargo: yup.object().nonNullable().required("Campo requerido"),
    idespecialidad: yup.object().nonNullable().required("Campo requerido"),
  });

  export const validationSchemaAdmin = yup.object().shape({
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
    roles: yup.object().nonNullable().required("Campo requerido"),
    idunidad: yup.object().nonNullable().required("Campo requerido"),    
    idcargo: yup.object().nonNullable().required("Campo requerido"),
    idespecialidad: yup.object().nonNullable().required("Campo requerido"),
  });