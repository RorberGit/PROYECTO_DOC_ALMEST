import api from "../../services/axios.service";
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

export const useCargos = () => {
  const [cargos, setCargos] = useState([]);

  const getCargosAPI = async () => {
    await api
      .get(RoutesURL.CARGOS)
      .then((result) => setCargos(() => result.data.data));
  };

  useEffect(() => {
    getCargosAPI();
  }, []);

  return [cargos, setCargos];
};
