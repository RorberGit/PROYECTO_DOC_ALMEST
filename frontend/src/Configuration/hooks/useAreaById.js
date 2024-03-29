import api from "../../services/axios.service";
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

export const useAreaById = (id) => {
  const [area, setArea] = useState([]);

  useEffect(() => {
    const getAreaAPI = async () => {
      await api
        .get(`${RoutesURL.AREAS}/${id}`)
        .then((result) => setArea(result.data.data));
    };

    getAreaAPI();
  }, [area]);

  return [area];
};
