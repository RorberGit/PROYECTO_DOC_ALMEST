import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RoutesURLRoot } from "../contants/routes.constans";

export default function AuthGuard() {
  const location = useLocation();
  const userState = useSelector((state) => state.user);

  return userState?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={RoutesURLRoot.LOGIN} state={{ from: location }} replace />
  );
}
