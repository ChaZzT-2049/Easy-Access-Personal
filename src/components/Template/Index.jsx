import Topbar from "./Topbar"
import Sidebar from "./Sidebar";
import Bottombar from "./Bottombar";
import Options from "./Options";
import {MainContainer} from "../../UI/index"
import useDialog from "../../hooks/useDialog";
const AppTemplate = ({children}) => {
    const options = useDialog()
    const sidebar = useDialog()
    return <>
        <Topbar handleSidebar={sidebar.trigger} handleOptions={options.trigger}/>
        <Options controls={options}/>
        <Sidebar controls={sidebar}/>
        <MainContainer>
            {children}
        </MainContainer>
        <Bottombar/>
    </>
}
export default AppTemplate;