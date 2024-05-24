import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Layaut from "./Component/Layaut";
import { AuthGuard } from "./guards";
import { RoutesURLRoot } from "./contants/routes.constans";
import RegistrosDoc from "./pages/registrosDoc";
import Unauthorized from "./pages/Unauthorized";
import RoleGuard from "./guards/Rol.guard";
import { Roles } from "./contants/models.constans";
import Avatar from "./pages/Avatar";
import { Content, Persist } from "./Component";
import { Suspense, lazy, useEffect } from "react";
import { theme } from "./styles";
import { useDispatch } from "react-redux";
import DataFetching from "./services/dataFetching.service";
import { createFlujo } from "./redux/states/flujoSlice";
import Dashboard from "./pages/Dashboard";
import OpciReg from "./opci";
import { useReduxUsuario } from "./redux/hooks";

const SignIn = lazy(() => import("./pages/SignIn"));
const Configuration = lazy(async () => await import("./Configuration"));

function App() {
  const redux = useReduxUsuario();
  const dispatch = useDispatch();

  useEffect(() => {
    const funFlujo = async () => {
      if (redux.list.idUsuario) {
        const reg = await DataFetching(redux.list.idUsuario);
        if (reg.length) {
          dispatch(createFlujo(reg));
        }
      }
    };

    funFlujo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            {/*Ruta hasta el LOGIN */}
            <Route
              path="signin"
              element={
                <Suspense fallback={<>...Cargando</>}>
                  <SignIn />
                </Suspense>
              }
            />

            <Route element={<Persist />}>
              <Route element={<AuthGuard />}>
                <Route path="/" element={<Layaut />}>
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  {/*Ruta hasta el Dashboard*/}
                  <Route
                    index
                    element={<Navigate to={`${RoutesURLRoot.DASHBOARD}`} />}
                  />
                  <Route
                    path={`${RoutesURLRoot.DASHBOARD}/*`}
                    element={
                      <Suspense fallback={<>...Cargando</>}>
                        <Dashboard />
                      </Suspense>
                    }
                  />
                  <Route element={<Content />}>
                    <Route
                      path={`${RoutesURLRoot.AVATAR}/:id`}
                      element={
                        <Suspense fallback={<>...Cargando</>}>
                          <Avatar />
                        </Suspense>
                      }
                    />
                  </Route>
                  {/*Ruta hasta el modulo de registro de documentos*/}
                  <Route
                    element={
                      <RoleGuard
                        rol={[Roles.ADMIN, Roles.EJECUTOR, Roles.EDITOR]}
                      />
                    }
                  >
                    <Route
                      path={`${RoutesURLRoot.REGISTROS}/*`}
                      element={
                        <Suspense fallback={<>...Cargando</>}>
                          <RegistrosDoc />
                        </Suspense>
                      }
                    />
                  </Route>
                  {/**Para el modulo de la OPCI */}
                  <Route
                    element={
                      <RoleGuard
                        rol={[
                          Roles.ADMIN,
                          Roles.OPCI,
                          Roles.EJECUTOR,
                          Roles.EDITOR,
                        ]}
                      />
                    }
                  >
                    <Route
                      path={`${RoutesURLRoot.OPCI}/*`}
                      element={
                        <Suspense fallback={<>Cargando...</>}>
                          <OpciReg />
                        </Suspense>
                      }
                    />
                  </Route>
                  {/**En caso de que la ruta no este expecificada */}
                  <Route path="*" element={<div>Página no encontrada</div>} />
                </Route>
                {/**Ruta del modulo de configuracion fuera del layout */}
                <Route
                  element={
                    <RoleGuard rol={[Roles.SUPER, Roles.ADMIN, Roles.OPCI]} />
                  }
                >
                  <Route
                    path="config/*"
                    element={
                      <Suspense fallback={<>...</>}>
                        <Configuration />
                      </Suspense>
                    }
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
