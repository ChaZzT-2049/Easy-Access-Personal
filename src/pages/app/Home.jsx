import useAppContext from "../../hooks/useAppContext"
const Home = () => {
    const {user} = useAppContext()
    return <>
        <h1>Bienvenido, {user.displayName || "Usuario"}.</h1>
    </>
}
export default Home;