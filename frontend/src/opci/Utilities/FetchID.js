import { useEffect, useState } from "react";
import { api } from "../../services";

export const FetchID = (url = "") => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      await api
        .get(url, {
          signal: abortController.signal,
        })
        .then((response) => {
          setData(response?.data?.data);
        })
        .catch((error) => {
          if (error.response) {
            setError(error?.response?.data?.message);
          }
        })
        .finally(() => setloading(true));
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, error, loading };
};
