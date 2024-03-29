import api from "../../services/axios.service";
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

export const useUnidadById = (id) => {
  const [unidad, setUnidad] = useState([]);

  useEffect(() => {
    const getUnidadesAPI = async () => {
      await api
        .get(`${RoutesURL.UNIDADES}/${id}`)
        .then((result) => setUnidad(result.data.data));
    };

    getUnidadesAPI();
  }, [id]);

  return [unidad, setUnidad];
};
