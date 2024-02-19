import { Navigate } from "react-router-dom";
const Middleware = ({validacion, children, redirect}) => {
    if(validacion) return <Navigate to={redirect}></Navigate>

    return <>{children}</>
}
export default Middleware;