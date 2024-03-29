import { RoutesURLRoot } from "../../contants";
import { api } from "../../services";

const FetchData = async (
  setClasificacion,
  setExternas,
  setEntidades,
  setDepartamento,
  setTipoDoc,
  setIsLoading
) => {
  return Promise.all([
    api.get(RoutesURLRoot.DOCCLASIFICACION),
    api.get(RoutesURLRoot.PROCEDENCIA),
    api.get(RoutesURLRoot.DESTINO),
    api.get(RoutesURLRoot.DEPARTAMENTO),
    api.get(RoutesURLRoot.TIPODOC),
  ])
    .then((values) => {
      const [clasf, extr, unit, dpto, tipodoc] = values;

      setClasificacion(clasf.data.data);
      setExternas(extr.data.data);
      setEntidades(unit.data.data);
      setDepartamento(dpto.data.data);
      setTipoDoc(tipodoc.data.data);
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      setIsLoading(true);
    });
};

export default FetchData;
