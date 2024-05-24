import { lazy } from "react";
import PageRoutes from "../../Component/pageRoutes";

const VIEW = lazy(async () => await import("./Views/view"));
const FORMULARIO = lazy(async () => await import("./Views/formulario"));
const DETAIL = lazy(async () => await import("./Views/detail"));

export default function Destino() {
  return <PageRoutes VIEW={VIEW} FORM={FORMULARIO} DETAIL={DETAIL} />;
}
