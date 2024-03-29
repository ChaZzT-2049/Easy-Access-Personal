import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Welcome from "../../pages/Welcome"
import Home from "../../pages/Home";
import Asignaciones from "../../pages/Asignaciones";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import NotFound from "../../pages/NotFound";
import AccountVerifyReset from "../../pages/AccountVerifyReset";
import UserProfile from "../../pages/UserProfile";
import Suscription from "../../pages/Suscription";
import AdminPanel from "../../pages/AdminPanel";

import Loader from "../Loader/Index";
import Alerts from "../Alerts/Index";

import { ThemeProvider } from "styled-components";
import {lightTheme, darkTheme} from "../../UI/themes";
import useAppContext from "../../hooks/useAppContext";
import useMiddleware from "../../hooks/useMiddleware";
import Middleware from "../Middleware/Index";

const RouteList = () => {
  const {tema, loader, alerts, appToast} = useAppContext();
  const {suscriptionM, authM} = useMiddleware()
  return <ThemeProvider theme={tema ? lightTheme : darkTheme}>
    <Loader message={loader}/>
    <Alerts alerts={alerts} />
    <Router>
      <Routes>
        <Route path="/" element={ <Welcome/> }/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={ <ForgotPassword/> }/>
        <Route path="/account-verify-reset" element={ <AccountVerifyReset/> }/>
        <Route path="/home" element={<Middleware {...authM} children={<Home/>}/>} />
        <Route path="/admin-panel" element={<Middleware {...authM} children={
          <Middleware alert={appToast.warning} {...suscriptionM} children={<AdminPanel/>}/>}/>
        } />
        <Route path="/admin/instalation/:id" element={<Middleware {...authM} children={
          <Middleware alert={appToast.warning} {...suscriptionM} children={<AdminInstalation/>}/>}/>
        } />
        <Route path="/asignaciones" element={<Middleware {...authM} children={<Asignaciones/>}/>}/>
        <Route path="/perfil" element={<Middleware {...authM} children={<UserProfile/>}/>}/>
        <Route path="/suscription" element={<Middleware {...authM} children={<Suscription/>}/>}/>
        <Route path="*" element={<NotFound />}/> 
      </Routes>
    </Router>
  </ThemeProvider>
}
export default RouteList