import { BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom";

import Welcome from "../../pages/Welcome"
import AccountVerifyReset from "../../pages/AccountVerifyReset";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import Home from "../../pages/app/Home";
import Asignaciones from "../../pages/app/Asignaciones";
import Profile from "../../pages/app/user/Profile";
import Suscription from "../../pages/app/user/Suscription";
import Panel from "../../pages/app/admin/Panel";
import Instalation from "../../pages/app/admin/instalation/Dashboard";
import InstalationUsers from "../../pages/app/admin/instalation/InstalationUsers";
import AccessPoints from "../../pages/app/admin/instalation/AccessPoints";
import Inscription from "../../pages/app/user/Inscription";
import AccessScanner from "../../pages/app/admin/instalation/AccessScaner";
import NotFound from "../../pages/NotFound";

import Loader from "../UI/Loader/Index";
import Alerts from "../UI/Alerts/Index";
import { ThemeProvider } from "styled-components";
import {lightTheme, darkTheme} from "../../styled/themes";

import useAppContext from "../../hooks/app/useAppContext";
import AuthContainer from "../Middleware/AuthContainer";
import AppContainer from "../Middleware/AppContainer";
import AdminContainer from "../Middleware/AdminContainer";
import InstalationContainer from "../Middleware/InstalationContainer";




const RouteList = () => {
  const {tema} = useAppContext();
  return <ThemeProvider theme={tema ? lightTheme : darkTheme}>
    <Loader/>
    <Alerts/>
    <Router>
      <Routes>
        <Route path="/welcome" element={ <Welcome/> }/>
        <Route path="/auth/" element={<AuthContainer/>}>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>}/>
          <Route path="forgot-password" element={ <ForgotPassword/> }/>
        </Route>
        <Route path="/account-verify-reset" element={<AccountVerifyReset/>}/>
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
              <Route path="users" element={<InstalationUsers/>} />
              <Route path="access-points" element={<AccessPoints/>} />
              <Route path="scanner" element={<AccessScanner/>} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}/> 
      </Routes>
    </Router>
  </ThemeProvider>
}
export default RouteList