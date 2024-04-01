import { Outlet, useParams } from "react-router-dom"
import Middleware from "./Index"
import useDocument from "../../hooks/useDocument"
import useAppContext from "../../hooks/useAppContext"

const InstalationContainer = () => {
    const {user, appToast} = useAppContext()
    const {id} = useParams()
    const {document} = useDocument("instalations", id)
    return <Middleware redirect="/admin/panel" 
        validacion={(!id) || (document && document.user !== user.uid)}
        alert={appToast.warning}
        message="No tienes permisos para administrar esta instalación."
    >
        <Outlet />
    </Middleware>
}
export default InstalationContainer