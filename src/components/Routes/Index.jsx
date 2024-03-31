import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Welcome from "../../pages/Welcome"
import AccountVerifyReset from "../../pages/AccountVerifyReset";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import Home from "../../pages/app/Home";
import Asignaciones from "../../pages/app/Asignaciones";
import UserProfile from "../../pages/app/UserProfile";
import Suscription from "../../pages/app/Suscription";
import Panel from "../../pages/app/admin/Panel";
import Instalation from "../../pages/app/admin/instalation/Instalation";
import InstalationUsers from "../../pages/app/admin/instalation/InstalationUsers";
import NotFound from "../../pages/NotFound";

import Loader from "../Loader/Index";
import Alerts from "../Alerts/Index";

import { ThemeProvider } from "styled-components";
import {lightTheme, darkTheme} from "../../UI/themes";
import useAppContext from "../../hooks/useAppContext";
import AuthContainer from "../Middleware/AuthContainer";
import AppContainer from "../Middleware/AppContainer";
import AdminContainer from "../Middleware/AdminContainer";
import InstalationContainer from "../Middleware/InstalationContainer";


const RouteList = () => {
  const {tema, loader, alerts} = useAppContext();
  return <ThemeProvider theme={tema ? lightTheme : darkTheme}>
    <Loader message={loader}/>
    <Alerts alerts={alerts} />
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
          <Route path="perfil" element={<UserProfile/>}/>
          <Route path="suscription" element={<Suscription/>}/>
          <Route path="admin/" element={<AdminContainer/>}>
            <Route path="panel" element={<Panel />}/>
            <Route path="instalation/:id/" element={<InstalationContainer/>}>
              <Route path="dashboard" element={<Instalation/>} />
              <Route path="users" element={<InstalationUsers/>} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}/> 
      </Routes>
    </Router>
  </ThemeProvider>
}
export default RouteList