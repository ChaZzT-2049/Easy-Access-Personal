import AppTemplate from "../components/Template/Index"
import useAppContext from "../hooks/useAppContext"
import useDoc from "../hooks/useDoc"

const UserProfile = () =>{
    const {user} = useAppContext()
    const {data, loading, error} = useDoc("users", user.uid)
    return <AppTemplate>
        <h1>Datos de la cuenta </h1>
        <img src={user.photoURL} alt="Foto de perfil" referrerPolicy="no-referrer" />
        <p>Nombre de usuario: {user.displayName}</p>
        <p>Correo: {user.email} estado: {user.emailVerified ? "Verificado" : "No verificado"}</p>
        <p>Numero de Telefono: {user.phoneNumber}</p>
        <hr />
        <h1>Datos Personales</h1>
        {loading ? <li>Loading...</li> : <>
            {error && <li>Error: {error}</li>}
            {data ? <>
                <p>Nombre: {data.nombre}</p>
                <p>Apellidos: {data.apellidos}</p>
            </> : <>No hay</>
            }
        </>}

    </AppTemplate>
}
export default UserProfile