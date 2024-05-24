import { useCallback, useEffect, useState } from "react";
import useAxiosToken from "./useAxiosToken";

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
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error("error useFetch :> ", error);

        if (error.response) {
          if (error.response) setError(error?.response?.data?.message);

          if (error.code === "ERR_NETWORK") setError("Servidor no encontrado.");
        }
      })
      .finally(() => setloading(true));

    abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};
