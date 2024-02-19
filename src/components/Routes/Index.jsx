import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Welcome from "../../pages/Welcome"
import Home from "../../pages/Home";
import Asignaciones from "../../pages/Asignaciones";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";

import Loader from "../Loader/Index";

import { ThemeProvider } from "styled-components";
import {lightTheme, darkTheme} from "../../UI/themes";
import useAppContext from "../../hooks/useAppContext";
import Middleware from "../Middleware/Index";
import useMiddleware from "../../hooks/useMiddleware";
import NotFound from "../../pages/NotFound";
import ResetPassword from "../../pages/ResetPassword";

const RouteList = () => {
  const {tema, loader, auth, user} = useAppContext();

  const loginMiddleware = useMiddleware("/home", auth)
  const authMiddleware = useMiddleware("/login", auth === false || user === null)

  return <ThemeProvider theme={tema ? lightTheme : darkTheme}>
    <Loader message={loader}/>
    <Router>
      <Routes>
        <Route path="/" element={ <Welcome/> }/>
        <Route path="/login" element={<Middleware {...loginMiddleware}><Login/></Middleware>} />
        <Route path="/register" element={<Middleware {...loginMiddleware}><Register/></Middleware>}/>
        <Route path="/forgot-password" element={ <Middleware {...loginMiddleware}><ForgotPassword/></Middleware> }/>
        <Route path="/reset-password" element={ <Middleware {...loginMiddleware}><ResetPassword/></Middleware> }/>
        <Route path="/home" element={<Middleware {...authMiddleware}><Home/></Middleware> } />
        <Route path="/asignaciones" element={ <Middleware {...authMiddleware}><Asignaciones/></Middleware>}/>
        <Route path="*" element={<NotFound />}/> 
      </Routes>
    </Router>
  </ThemeProvider>
}
export default RouteList