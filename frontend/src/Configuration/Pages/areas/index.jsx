import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Content from "../../Component/Content";
import { RoutesURL } from "../../Contants/Routes.contants";

const VIEW = React.lazy(async () => await import("./Views/view"));
const INSERT = React.lazy(async () => await import("./Views/insert"));
const EDIT = React.lazy(async () => await import("./Views/edit"));
const DETAIL = React.lazy(async () => await import("./Views/detail"));

export default function Unit() {
  return (
    <Routes>
      <Route path="/" element={<Content />}>
        <Route index element={<VIEW />} />
        <Route path={RoutesURL.VIEW} element={<VIEW />} />
        <Route path={RoutesURL.INSERT} element={<INSERT />} />
        <Route path={`${RoutesURL.EDIT}/:id`} element={<EDIT />} />
        <Route path={`${RoutesURL.DETAIL}/:id`} element={<DETAIL />} />
      </Route>
    </Routes>
  );
}
