import { lazy } from "react";
import PageRoutes from "../../Component/pageRoutes";

const VIEW = lazy(async () => await import("./Views/view"));
const INSERT = lazy(async () => await import("./Views/insert"));
const EDIT = lazy(async () => await import("./Views/edit"));
const DETAIL = lazy(async () => await import("./Views/detail"));

export default function OtrasEntidades() {
  return <PageRoutes VIEW={VIEW} INSERT={INSERT} EDIT={EDIT} DETAIL={DETAIL} />;
}
