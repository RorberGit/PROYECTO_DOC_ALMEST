import { Route, Routes } from "react-router-dom";
import { RoutesURL } from "../Contants/Routes.contants";
import Content from "./Content";

export default function PageRoutes({ VIEW, INSERT, EDIT, DETAIL }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Content />}>
          <Route index element={<VIEW />} />
          <Route path={RoutesURL.VIEW} element={<VIEW />} />
          <Route path={RoutesURL.INSERT} element={<INSERT />} />
          <Route path={`${RoutesURL.EDIT}/:id`} element={<EDIT />} />
          <Route path={`${RoutesURL.DETAIL}/:id`} element={<DETAIL />} />
        </Route>
      </Routes>
    </>
  );
}
