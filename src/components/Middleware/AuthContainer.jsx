import { Outlet } from "react-router-dom"
import Middleware from "./Index"
import useAppContext from "../../hooks/app/useAppContext";

const AuthContainer = () => {
    const previous = localStorage.getItem("previous") || "/home";
    const {auth} = useAppContext()
    return <Middleware redirect={previous} validacion={auth}>
        <Outlet />
    </Middleware>
}
export default AuthContainer