import { Route, Routes } from "react-router-dom";
import { RoutesURL } from "../Contants/Routes.contants";
import Content from "./Content";
import PropTypes from "prop-types";

export default function PageRoutes({ VIEW, FORM, DETAIL }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Content />}>
          <Route index element={<VIEW />} />
          <Route path={RoutesURL.VIEW} element={<VIEW />} />
          <Route path={RoutesURL.FORMULARIO} element={<FORM />} />
          <Route path={`${RoutesURL.DETAIL}/:id`} element={<DETAIL />} />
        </Route>
      </Routes>
    </>
  );
}

PageRoutes.propTypes = {
  VIEW: PropTypes.object,
  FORM: PropTypes.object,
  DETAIL: PropTypes.object,
};
