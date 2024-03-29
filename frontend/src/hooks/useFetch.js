import { useCallback, useEffect, useState } from "react";
import useAxiosToken from "../hooks/useAxiosToken";

export const useFetch = (url = "") => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);

  const axiosToken = useAxiosToken();

  const fetchData = useCallback(async () => {
    const abortController = new AbortController();

    await axiosToken
      .get(url, {
        signal: abortController.signal,
      })
      .then((response) => {
        return response?.data.data;
      })
      .then((response) => {
        console.info("response useFetch :>", response);
        setData(response);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.error("error :> ", error);

          if (error.response) setError(error?.response?.data?.detail);

          if (error.code === "ERR_NETWORK") setError("Servidor no encontrado.");
        }
      })
      .finally(() => setloading(true));

    abortController.abort();
  }, [axiosToken, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};
