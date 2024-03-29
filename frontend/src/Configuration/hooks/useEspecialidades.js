import api from "../../services/axios.service";
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

export const useEspecialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);

  const getEspecialidadesAPI = async () => {
    await api
      .get(RoutesURL.ESPECIALIDADES)
      .then((result) => setEspecialidades(() => result.data.data));
  };

  useEffect(() => {
    getEspecialidadesAPI();
  }, []);

  return [especialidades, setEspecialidades];
};
