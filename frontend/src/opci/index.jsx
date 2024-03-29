import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Content } from "../Component";
import { RoutesURLRoot } from "../contants/routes.constans";
import { Box } from "@mui/material";

const VIEW = lazy(async () => await import("./Views/view"));
const DETAIL = lazy(async () => await import("./Views/detail"));
const FORMULARIO = lazy(async () => await import("./Views/Formulario"));

export default function OpciReg() {
  return (
    <Box component="main" sx={{ flex: 1, py: 4, px: 4, bgcolor: "#eaeff1" }}>
      <Routes>
        <Route path="/" element={<Content />}>
          <Route index element={<VIEW />} />
          <Route path={RoutesURLRoot.VIEW} element={<VIEW />} />
          <Route path={RoutesURLRoot.FORMULARIO} element={<FORMULARIO />} />
          <Route path={`${RoutesURLRoot.DETAIL}/:id`} element={<DETAIL />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </Box>
  );
}
