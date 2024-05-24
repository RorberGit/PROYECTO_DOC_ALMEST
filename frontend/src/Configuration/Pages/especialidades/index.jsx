import * as React from "react";
import PageRoutes from "./../../Component/pageRoutes";

const VIEW = React.lazy(async () => await import("./Views/view"));
const FORMULARIO = React.lazy(async () => await import("./Views/formulario"));
const DETAIL = React.lazy(async () => await import("./Views/detail"));

export default function Especialiades() {
  return <PageRoutes VIEW={VIEW} FORM={FORMULARIO} DETAIL={DETAIL} />;
}
