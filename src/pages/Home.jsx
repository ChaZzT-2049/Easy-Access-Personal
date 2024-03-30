import useAppContext from "../hooks/useAppContext"
import AppTemplate from "../components/Template/Index";
const Home = () => {
    const {user} = useAppContext()
    return <AppTemplate>
        <h1>Bienvenido, {user.displayName || "Usuario"}.</h1>
    </AppTemplate>
}
export default Home;