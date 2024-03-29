import api from "../../services/axios.service";
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

export const useEspecialidadById = (id) => {
  const [especialidad, setEspecialidad] = useState([]);

  useEffect(() => {
    const getAreaAPI = async () => {
      await api
        .get(`${RoutesURL.ESPECIALIDADES}/${id}`)
        .then((result) => setEspecialidad(() => result.data.data));
    };

    getAreaAPI();
  }, [especialidad, id]);

  return [especialidad];
};
