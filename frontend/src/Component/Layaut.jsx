import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layaut() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
