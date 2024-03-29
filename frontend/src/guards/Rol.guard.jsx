import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function RoleGuard({ rol }) {
  const location = useLocation();
  const userState = useSelector((state) => state.user);
  return rol.includes(userState.rol) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

RoleGuard.propTypes = {
  rol: PropTypes.array,
};

export default RoleGuard;
