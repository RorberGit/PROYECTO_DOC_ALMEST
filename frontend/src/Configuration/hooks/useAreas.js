import api from '../../services/axios.service'
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

export const useAreas = () => {
  const [areas, setAreas] = useState([]);

  const getAreasAPI = async () => {
    await api
      .get(RoutesURL.AREAS)
      .then((result) => setAreas(result.data.data));
  };

  useEffect(() => {
    getAreasAPI();
  }, []);

  return [areas, setAreas];
};
