import api from "../../services/axios.service";
import { useEffect, useState } from "react";
import { RoutesURL } from "../Contants/Routes.contants";

const useGetUserById = (id) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      await api.get(`${RoutesURL.USERS}/${id}`).then(async (result) => {
        const value = await result.data.data;
        setUser(() => value);
      });
    };

    getUser();
  }, [id]);

  return [user];
};

export default useGetUserById;
