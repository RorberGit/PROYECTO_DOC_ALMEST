import * as React from "react";

const VIEW = React.lazy(async () => await import("./Views/view"));
const FORMULARIO = React.lazy(async () => await import("./Views/formulario"));
const DETAIL = React.lazy(async () => await import("./Views/detail"));
import PageRoutes from "./../../Component/pageRoutes";

export default function Cargos() {
  return <PageRoutes VIEW={VIEW} FORM={FORMULARIO} DETAIL={DETAIL} />;
}
