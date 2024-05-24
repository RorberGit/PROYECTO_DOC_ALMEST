import { useMemo } from "react";

export const useStorageToken = () => {
  const action = useMemo(
    () => ({
      list: JSON.parse(localStorage.getItem("token")),
      id: JSON.parse(localStorage.getItem("token"))?.id,
      accessToken: JSON.parse(localStorage.getItem("token"))?.accessToken,
      setToken: (json = {}) =>
        localStorage.setItem("token", JSON.stringify(json)),
      setAccessToken: (accessToken = "") => {
        localStorage.setItem(
          "token",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("token")),
            accessToken: accessToken,
          })
        );
      },
      remove: () => localStorage.removeItem("token"),
    }),
    []
  );

  return action;
};
