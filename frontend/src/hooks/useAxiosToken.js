import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosToken } from "../api/axios";
import { useStorageToken } from "./use-StorageToken";
import { RoutesURLRoot } from "../contants";

const useAxiosToken = () => {
  const token = useStorageToken();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const requestIntercept = axiosToken.interceptors.request.use(
      (config) => {
        if (token?.accessToken) {
          config.headers["Authorization"] = `Bearer ${token?.accessToken}`;
          console.info("Request :> ", config);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosToken.interceptors.response.use(
      (response) => {
        console.info("Response :> ", response);
        return response;
      },
      async (error) => {
        console.error("Error AXIOS response :>", error);

        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          //const newAccessToken = await refresh();
          //prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          /*
    
    const originalConfig = err.config;

    if (err.response.status === 401) {

      originalConfig._retry = true;

      try {
        const rs = await instance.post("/auth/refreshtoken", {
          refreshToken: TokenService.getLocalRefreshToken(),
        });

        const { accessToken } = rs.data;
        TokenService.updateLocalAccessToken(accessToken);

        return instance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
*/
          return axiosToken(prevRequest);
        }

        if (error?.response?.status === 401) {
          navigate(`/${RoutesURLRoot.LOGIN}`, {
            state: { from: location },
            replace: true,
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosToken.interceptors.request.eject(requestIntercept);
      axiosToken.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return axiosToken;
};

export default useAxiosToken;
