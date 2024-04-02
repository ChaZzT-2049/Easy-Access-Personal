import Topbar from "./Topbar"
import Sidebar from "./Sidebar";
import Bottombar from "./Bottombar";
import Options from "./Options";
import {MainContainer} from "../../../styled/index"
import useDialog from "../../../hooks/useDialog";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const AppTemplate = () => {
    const options = useDialog()
    const sidebar = useDialog()
    const location = useLocation()
    if(location.pathname === "/"){
        return <Navigate to="/home" />
    }
    return <>
        <Topbar handleSidebar={sidebar.trigger} handleOptions={options.trigger}/>
        <Options controls={options}/>
        <Sidebar controls={sidebar}/>
        <MainContainer>
            <Outlet/>
        </MainContainer>
        <Bottombar/>
    </>
}
export default AppTemplate;