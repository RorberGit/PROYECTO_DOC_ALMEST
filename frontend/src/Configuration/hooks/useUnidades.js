import api from "../../services/axios.service";
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

export const useUnidades = () => {
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    const getUnidadesAPI = async () => {
      await api
        .get(RoutesURL.UNIDADES)
        .then((result) => setUnidades(() => result.data.data));
    };

    getUnidadesAPI();
  }, []);

  return [unidades, setUnidades];
};
