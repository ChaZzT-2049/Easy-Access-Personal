import AppTemplate from "../components/Template/Index"
import useAppContext from "../hooks/useAppContext";
import useDoc from "../hooks/useDoc";

const Suscription = () =>{
    const {user, toasts} = useAppContext()
    const {data, loading, error, set} = useDoc("suscriptions", user.uid)
    const updateSuscription = async() => {
        await set({
            active: true,
            type: "Bussiness"
        }).then(() => {
            toasts.success("Operacion Exitosa", "Hemos actualizado tu plan.")
        }).catch((error) => {
            toasts.error("Operacion Fallida", error)
        });
    }
    return <AppTemplate>
        <h1>Datos de suscripcion</h1>
        {loading ? <li>Loading...</li> : <>
            <button onClick={updateSuscription}>Suscribirme</button>
            {error && <li>Error: {error}</li>}
            {data ? <>
                <p>Tipo: {data.type}</p>
                <p>Estado: {data.active ? "Activo" : "Inactivo"}</p>
            </> : <>No hay</>
            }
        </>}
    </AppTemplate>
}
export default Suscription