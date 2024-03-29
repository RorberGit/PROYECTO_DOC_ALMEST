import api from "../../services/axios.service";
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

export const useOtrasEntidades = () => {
  const [otrasEntidades, setOtrasEntidades] = useState([]);

  useEffect(() => {
    let ignore = false;
    const getOtrasEntidadesAPI = async () => {
      try {
        await api.get(RoutesURL.OTRASENTIDADES).then(async (result) => {
          const value = await result.data.data;
          if (!ignore) {
            setOtrasEntidades(() => value);
          }
        });
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    getOtrasEntidadesAPI();

    return () => {
      ignore = true;
    };
  }, []);

  return [otrasEntidades, setOtrasEntidades];
};
