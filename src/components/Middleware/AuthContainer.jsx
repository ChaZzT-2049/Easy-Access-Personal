import { Outlet } from "react-router-dom"
import Middleware from "./Index"
import useAppContext from "../../hooks/app/useAppContext";
import { Suspense } from "react";
import Loader from "../UI/Loader/Index";

const AuthContainer = () => {
    const previous = localStorage.getItem("previous") || "/home";
    const {auth} = useAppContext()
    return <Middleware redirect={previous} validacion={auth}>
        <Suspense fallback={<Loader message="Cargando" />}>
            <Outlet />
        </Suspense>
    </Middleware>
}
export default AuthContainer