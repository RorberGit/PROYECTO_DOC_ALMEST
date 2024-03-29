import Paper from "@mui/material/Paper";

import { Outlet } from "react-router-dom";

export default function Content() {
  return (
    <Paper sx={{ margin: "auto", overflow: "hidden" }}>
      <Outlet />
    </Paper>
  );
}
