import { useEffect, useState } from "react";
import { api } from "../../services";

export const useFetch = (url = "") => {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setloading(true));
  }, [url]);

  return { loading };
};
