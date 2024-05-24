import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RoutesURLRoot } from "../contants/routes.constans";
import { useStorageToken } from "../hooks";

export default function AuthGuard() {
  const location = useLocation();
  const token = useStorageToken();

  return token?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={RoutesURLRoot.LOGIN} state={{ from: location }} replace />
  );
}
