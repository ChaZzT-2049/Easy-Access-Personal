import AppTemplate from "../components/Template/Index"
import Btn from "../components/Button/Index"
import useAppContext from "../hooks/useAppContext"
import useDoc from "../hooks/useDoc"

const AdminPanel = () => {
    const {user} = useAppContext()
    const susDoc = useDoc("suscriptions", user.uid)
    return <AppTemplate>
        <h1>Panel Administrador</h1>
        {susDoc.data && susDoc.data.active ? 
           <div>
                Tus instalaciones:
                <Btn type="icon" colors="primary" action="Crear Instalacion" icon="add" />
                <div>Instalacion</div>
            </div> : <span>Activa tu suscripcion de nuevo</span>
        }
    </AppTemplate>
}
export default AdminPanel