import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Content } from "../../Component";
import { RoutesURLRoot } from "../../contants/routes.constans";
import { Box } from "@mui/material";

const VIEW = lazy(async () => await import("./Views/view"));
const INSERT = lazy(async () => await import("./Views/insert"));
const EDIT = lazy(async () => await import("./Views/edit"));
const DETAIL = lazy(async () => await import("./Views/detail"));

export default function RegistrosDoc() {
  return (
    <Box component="main" sx={{ flex: 1, py: 4, px: 4, bgcolor: "#eaeff1" }}>
      <Routes>
        <Route path="/" element={<Content />}>
          <Route index element={<VIEW />} />
          <Route path={RoutesURLRoot.VIEW} element={<VIEW />} />
          <Route path={RoutesURLRoot.INSERT} element={<INSERT />} />
          <Route path={`${RoutesURLRoot.EDIT}/:id`} element={<EDIT />} />
          <Route path={`${RoutesURLRoot.DETAIL}/:id`} element={<DETAIL />} />
        </Route>
      </Routes>
    </Box>
  );
}
