import Topbar from "./Topbar"
import Sidebar from "./Sidebar";
import Bottombar from "./Bottombar";
import Options from "./Options";
import {MainContainer} from "../../UI/index"
import useToggle from "../../hooks/useToggle";

const AppTemplate = ({children}) => {
    const sidebar = useToggle()
    const options = useToggle()
    return <>
        <Topbar handleSidebar={sidebar.trigger} handleOptions={options.trigger}/>
        <Options show={options.toggle} handleOptions={options.trigger}/>
        <Sidebar show={sidebar.toggle} handleSidebar={sidebar.trigger} />
        <MainContainer>
            {children}
        </MainContainer>
        <Bottombar/>
    </>
}
export default AppTemplate;