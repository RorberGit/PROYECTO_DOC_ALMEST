import * as yup from "yup";

export const validation_OPCI = yup.object().shape({
  codigo: yup.string().required("Campo requerido"),
  estado: yup.object().nonNullable().required("Campo requerido"),
  descripcion: yup.string().required("Campo requerido"),
  idClasificacion: yup.object().nonNullable().required("Campo requerido"),
  idTipoDoc: yup.object().nonNullable().required("Campo requerido"),
  departamentos: yup.array().min(1, "Campo requerido"),
  externas: yup.array().min(1, "Campo requerido"),
  entidades: yup.array().min(1, "Campo requerido"),
});
