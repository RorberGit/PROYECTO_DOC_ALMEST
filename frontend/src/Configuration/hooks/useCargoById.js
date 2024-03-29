import api from "../../services/axios.service";
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

export const useCargoById = (id) => {
  const [cargo, setCargo] = useState([]);

  useEffect(() => {
    const getAreaAPI = async () => {
      await api
        .get(`${RoutesURL.CARGOS}/${id}`)
        .then((result) => setCargo(() => result.data.data));
    };

    getAreaAPI();
  }, [cargo, id]);

  return [cargo];
};
