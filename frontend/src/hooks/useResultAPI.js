import api from "../services/axios.service";
import { useEffect, useState } from "react";

export const useResultAPI = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let ignore = false;
    const getRequestAPI = async () => {
      try {
        await api.get(url).then(async (result) => {
          const value = await result.data.data;
          if (!ignore) {
            setData(() => value);
          }
        });
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    getRequestAPI();

    return () => {
      ignore = true;
    };
  }, [url]);

  return [data, setData];
};
