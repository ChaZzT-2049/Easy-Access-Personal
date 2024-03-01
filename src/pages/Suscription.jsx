import AppTemplate from "../components/Template/Index"
import useAppContext from "../hooks/useAppContext"

const Suscription = () =>{
    const {userData, updateSuscription} = useAppContext()
    return <AppTemplate>
        <h1>Datos de suscripcion</h1>
        <button onClick={updateSuscription}>Suscribirme</button>
        {(userData && userData.suscription) ? <>
            <p>Tipo: {userData.suscription.type}</p>
            <p>Estado: {userData.suscription.active ? "Activo" : "Inactivo"}</p>
            </> : <>No hay</>
        }
    </AppTemplate>
}
export default Suscription