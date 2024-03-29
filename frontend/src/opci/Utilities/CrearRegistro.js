import dayjs from "dayjs";
import "dayjs/locale/es";

const CrearRegistro = (values = {}, files = [], conscData = 0) => {
  const {
    estado,
    fecha,
    departamentos,
    procedencia,
    destino,
    idClasificacion,
    idTipoDoc,
  } = values;

  const file = files.flatMap((value) => [value.name]);

  return {
    ...values,
    estado: estado?.nombre,
    departamentos: departamentos.map((row) => row.id),
    procedencia: procedencia.map((row) => row.id),
    destino: destino.map((row) => row.id),
    conteo: conscData,
    fecha: values.fecha ? dayjs(fecha).format("YYYY-MM-DD") : null,
    ClasificacionDocumentoID: idClasificacion?.id,
    TipoDocumentoID: idTipoDoc?.id,
    file: file,
  };
};

export default CrearRegistro;
