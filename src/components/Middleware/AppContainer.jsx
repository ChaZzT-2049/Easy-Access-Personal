import useAppContext from "../../hooks/useAppContext"
import AppTemplate from "../Template/Index"
import Middleware from "./Index"

const AppContainer = () => {
    const {auth, user} = useAppContext()
    return <Middleware redirect="/auth/login" validacion={(auth === false || user === null)}>
        <AppTemplate />
    </Middleware>
}
export default AppContainer