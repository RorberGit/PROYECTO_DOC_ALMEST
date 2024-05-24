import { RoutesURLRoot } from "../contants";
import axios from "../api/axios";

const DataFetching = async (idUsuario) => {
  let flujo = [];
  let convert = [];

  const firmantes = await axios.get(
    `${RoutesURLRoot.FIRMANTES}/user/${idUsuario}`
  );

  if (firmantes.data.statusCode === 200) {
    const firmante = firmantes.data.data;

    const url = new URL(`${RoutesURLRoot.REGISTROS}/reg`, RoutesURLRoot.APIURL);

    /*Ciclo map para cada configuracion de firmante, del usurio logeado*/
    const promises = Array.isArray(firmante)
      ? firmante.map(async (values) => {
          const { idClasificacion, idUnidad, idTerritorio } =
            values.flujo_relation;

          const params = new URLSearchParams({
            idClasificacion: idClasificacion,
            idUnidad: idUnidad,
            idTerritorio: idTerritorio,
            estado: "Por aprobar",
          });

          /**Consulta a la tabla registro para buscar coincidencias*/
          const registros = await axios.get(`${url}?${params}`);

          if (registros.data.statusCode === 200) {
            const registro = registros.data.data;

            convert = await registro.flatMap((res) => {
              if (
                (values.orden === 1 && values.orden - 1 === res.ordenf) ||
                (values.orden > 1 && values.orden - 1 === res.ordenf)
              ) {
                return {
                  id: res?.id,
                  codigo: res?.codigo,
                  fecha: res?.fecha,
                  descripcion: res?.descripcion,
                  clasificacion: res?.idClasificacion?.name,
                  destino: res?.destino,
                  unidad: res?.unidad_relation?.name,
                  file: res?.file,
                  idFirmante: values?.id,
                  ordenFirmmante: values?.orden,
                  idFlujo: values?.flujo_relation?.id,
                  creadopor: res?.idUsuario?.fullname,
                  createdDate: res?.createdDate,
                };
              } else return [];
            });

            return convert;
          }
        })
      : [];

    const results = await Promise.allSettled(promises);

    const fulfilledResults = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value)
      .flat();
    flujo = fulfilledResults;

    /*
    const results = await Promise.all(promises);
    const filteredResults = results.filter((result) => result.length > 0);
    flujo = filteredResults.flat();
    */
  }

  return flujo;
};

export default DataFetching;
