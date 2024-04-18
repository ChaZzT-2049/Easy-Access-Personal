import Topbar from "./Topbar"
import Sidebar from "./Sidebar";
import Bottombar from "./Bottombar";
import Options from "./Options";
import { MainContainer} from "../../../styled/index"
import useDialog from "../../../hooks/useDialog";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../Loader/Index";
const AppTemplate = () => {
    const options = useDialog()
    const sidebar = useDialog()
    return <>
        <Topbar handleSidebar={sidebar.trigger} handleOptions={options.trigger}/>
        <Options controls={options}/>
        <Sidebar controls={sidebar}/>
        <MainContainer>
            <Suspense fallback={<Loader message="Cargando" />}>
                <Outlet/>
            </Suspense>
        </MainContainer>
        <Bottombar/>
    </>
}
export default AppTemplate;