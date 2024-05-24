import * as yup from "yup";

export const validation_OPCI = yup.object().shape({
  codigo: yup.string().required("Campo requerido"),
  estado: yup.object().nonNullable().required("Campo requerido"),
  idTipoDocumento: yup.object().nonNullable().required("Campo requerido"),
  idClasificacion: yup.object().nonNullable().required("Campo requerido"),
  descripcion: yup.string().required("Campo requerido"),
  procedencia: yup.array().min(1, "Campo requerido"),
  destino: yup.array().min(1, "Campo requerido"),
  unidades: yup.array().min(1, "Campo requerido"),
});
