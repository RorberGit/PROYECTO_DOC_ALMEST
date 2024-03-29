import api from "../../services/axios.service";
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

export const useClasificacionDocById = (id) => {
  const [clasificacionDoc, setClasificacionDoc] = useState([]);

  useEffect(() => {
    let ignore = false;
    const getClasificacionDocAPI = async () => {
      try {
        await api
          .get(`${RoutesURL.DOCCLASIFICACION}/${id}`)
          .then(async (result) => {
            const value = await result.data.data;
            if (!ignore) {
              setClasificacionDoc(() => value);
            }
          });
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getClasificacionDocAPI();

    return () => {
      ignore = true;
    };
  }, [id]);

  return [clasificacionDoc, setClasificacionDoc];
};
