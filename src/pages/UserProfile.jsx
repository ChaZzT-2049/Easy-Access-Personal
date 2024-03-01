import AppTemplate from "../components/Template/Index"
import useAppContext from "../hooks/useAppContext"

const UserProfile = () =>{
    const {user, userData} = useAppContext()
    return <AppTemplate>
        <h1>Datos de la cuenta </h1>
        <img src={user.photoURL} alt="Foto de perfil" referrerPolicy="no-referrer" />
        <p>Nombre de usuario: {user.displayName}</p>
        <p>Correo: {user.email} estado: {user.emailVerified ? "Verificado" : "No verificado"}</p>
        <p>Numero de Telefono: {user.phoneNumber}</p>
        <hr />
        <h1>Datos Personales</h1>
        <p>Nombre: {userData.nombre}</p>
        <p>Apellidos: {userData.apellidos}</p>

    </AppTemplate>
}
export default UserProfile