import AppTemplate from "../components/Template/Index"
import Btn from "../components/Button/Index"
import useAppContext from "../hooks/useAppContext"

const AdminPanel = () => {
    const {userData} = useAppContext()
    return <AppTemplate>
        <h1>Panel Administrador</h1>
        {(userData.suscription && userData.suscription.active) ? 
           <div>
                Tus instalaciones:
                <Btn type="icon" colors="primary" action="Crear Instalacion" icon="add" />
            </div> : <span>Activa tu suscripcion de nuevo</span>
        }
    </AppTemplate>
}
export default AdminPanel