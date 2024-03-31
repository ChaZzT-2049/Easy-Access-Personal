import { Navigate, Outlet, useLocation } from "react-router-dom"
const AdminContainer = () => {
    const location = useLocation()
    if(location.pathname === "/admin/" || location.pathname === "/admin"){
        return <Navigate to="/admin/panel" />
    }
    return <Outlet/>
}
export default AdminContainer