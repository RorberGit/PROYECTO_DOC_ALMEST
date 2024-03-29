import api from "../../services/axios.service";
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const getUsuariosAPI = async () => {
      await api
        .get(RoutesURL.USERS)
        .then((result) => setUsuarios(() => result.data.data));
    };

    getUsuariosAPI();
  }, []);

  return [usuarios, setUsuarios];
};
