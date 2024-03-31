import { Outlet, useParams } from "react-router-dom"
import Middleware from "./Index"

const InstalationContainer = () => {
    const {id} = useParams()
    console.log(id)
    return <Middleware redirect="/admin/panel" validacion={(!id)}>
        <Outlet />
    </Middleware>
}
export default InstalationContainer