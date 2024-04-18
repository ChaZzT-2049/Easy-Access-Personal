import { BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom";
import {lazy, Suspense} from "react"

import Loader from "../UI/Loader/Index";
import Alerts from "../UI/Alerts/Index";
import { ThemeProvider } from "styled-components";
import {lightTheme, darkTheme} from "../../styled/themes";

import useAppContext from "../../hooks/app/useAppContext";
import AuthContainer from "../Middleware/AuthContainer";
import AppContainer from "../Middleware/AppContainer";
import AdminContainer from "../Middleware/AdminContainer";
import InstalationContainer from "../Middleware/InstalationContainer";

const Welcome = lazy(() => import("../../pages/Welcome"))
const Login = lazy(() => import("../../pages/auth/Login"))
const Register = lazy(() => import("../../pages/auth/Register"))
const ForgotPassword = lazy(() => import("../../pages/auth/ForgotPassword"))
const Terms = lazy(() => import("../../pages/Terms"))
const AccountVerifyReset = lazy(() => import("../../pages/auth/Login"))
const Home = lazy(() => import("../../pages/app/Home"))
const Asignaciones = lazy(() => import("../../pages/app/Asignaciones"))
const Profile = lazy(() => import("../../pages/app/user/Profile"))
const Suscription = lazy(() => import("../../pages/app/user/Suscription"))
const Inscription = lazy(() => import("../../pages/app/user/Inscription"))
const Panel = lazy(() => import("../../pages/app/admin/Panel"))
const Instalation = lazy(() => import("../../pages/app/admin/instalation/Dashboard"))
const InstUsers = lazy(() => import("../../pages/app/admin/instalation/InstUsers"))
const AccessPoints = lazy(() => import("../../pages/app/admin/instalation/AccessPoints"))
const AccessScanner = lazy(() => import("../../pages/app/admin/instalation/AccessScaner"))
const Records = lazy(() => import("../../pages/app/admin/instalation/Records"))
const NotFound = lazy(() => import("../../pages/NotFound"))

const RouteList = () => {
  const {tema, loader} = useAppContext();
  return <ThemeProvider theme={tema ? lightTheme : darkTheme}>
    <Loader message={loader}/>
    <Alerts/>
    <Router>
      <Routes>
        <Route path="/welcome" element={<Suspense fallback={<h1>Cargando...</h1>}><Welcome/></Suspense>}/>
        <Route path="/auth/" element={<AuthContainer/>}>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>}/>
          <Route path="forgot-password" element={ <ForgotPassword/> }/>
        </Route>
        <Route path="/terms" element={<Suspense fallback={<h1>Cargando...</h1>}><Terms/></Suspense>}/>
        <Route path="/account-verify-reset" element={<Suspense fallback={<h1>Cargando...</h1>}><AccountVerifyReset/></Suspense>}/>
        <Route path="/" element={<AppContainer />}>
          <Route path="home" element={<Home/>}/>
          <Route path="asignaciones" element={<Asignaciones/>}/>
          <Route path="user/" element={<Outlet/>}>
            <Route path="perfil" element={<Profile/>}/>
            <Route path="suscription" element={<Suscription/>}/>
            <Route path="inscription/:id/" element={<Inscription/>}/>
          </Route>
          <Route path="admin/" element={<AdminContainer/>}>
            <Route path="panel" element={<Panel />}/>
            <Route path="instalation/:id/" element={<InstalationContainer/>}>
              <Route path="dashboard" element={<Instalation/>} />
              <Route path="users" element={<InstUsers/>} />
              <Route path="access-points" element={<AccessPoints/>} />
              <Route path=":point/scanner" element={<AccessScanner/>} />
              <Route path="records" element={<Records/>} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Suspense fallback={<h1>Cargando...</h1>}><NotFound /></Suspense>}/> 
      </Routes>
    </Router>
  </ThemeProvider>
}
export default RouteList