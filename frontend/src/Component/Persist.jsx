import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAxiosToken, useStorageToken } from "../hooks";
import { useReduxUsuario } from "../redux/hooks";
import { RoutesURL } from "../Configuration/Contants/Routes.contants";

const Persist = () => {
  const [isLoading, setIsLoading] = useState(true);

  const token = useStorageToken();
  const redux = useReduxUsuario();

  const axiosToken = useAxiosToken();

  useEffect(() => {
    let isMounted = true;

    const refresh = async () => {
      axiosToken
        .get(`${RoutesURL.USUARIOS}/${token.id}`)
        .then((response) => {
          redux.create({
            idUsuario: response.data.id,
            fullname: response.data.fullname,
            usuario: response.data.user,
            rol: response.data.roles,
            idUnidad: response.data.unidad_relation.id,
            keyUnidad: response.data.unidad_relation.key,
            unidad: response.data.unidad_relation.nombre,
            foto: response.data.foto,
          });
        })
        .finally(() => {
          isMounted && setIsLoading(false);
        });
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !redux?.list?.usuario && token?.id ? refresh() : setIsLoading(false);

    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {redux?.list?.usuario ? (
        <Outlet />
      ) : isLoading ? (
        <p>Cargando...</p>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Persist;
