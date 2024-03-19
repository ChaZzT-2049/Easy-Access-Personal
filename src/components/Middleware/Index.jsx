import { useEffect } from "react";
import { Navigate } from "react-router-dom";
const Middleware = ({validacion, children, redirect, alert, message}) => {
    useEffect(() => {
        if(validacion && message && alert) {
            alert("Alerta", message)
        }
    }, [validacion, message, alert]);
    if(validacion) {
        return <Navigate to={redirect}></Navigate>;
    }
    return <>{children}</>
}
export default Middleware;