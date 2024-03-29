import { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import { RoutesURL } from "../../../Contants/Routes.contants";

const useFetchUsuarios = () => {
  const [usuarios, setUsuarios] = useState({
    data: null,
    error: null,
    loading: null,
  });

  const { data, error, loading } = useFetch(RoutesURL.USERS);

  useEffect(() => {
    console.info("data :>", data);
    //console.info("error :>", error);
    //console.info("loading :>", loading);
    setUsuarios((prev) => {
      return { ...prev, data: data, error: error, loading: loading };
    });
  }, [data, error, loading]);

  return usuarios;
};

export default useFetchUsuarios;
