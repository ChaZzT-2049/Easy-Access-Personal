import AppTemplate from "../components/Template/Index"
import Btn from "../components/Button/Index"
import useAppContext from "../hooks/useAppContext"
import useDoc from "../hooks/useDoc"
import { PageTitle } from "../UI"
import useCollection from "../hooks/useCollection"

const AdminPanel = () => {
    const {user} = useAppContext()
    const susDoc = useDoc("suscriptions", user.uid)
    const [instalations] = useCollection("instalations")
    return <AppTemplate>
        <PageTitle>Panel de Administrador</PageTitle>
        {susDoc.data && susDoc.data.active ? 
           <div>
                Tus instalaciones:
                <Btn type="icon" colors="primary" action="Crear Instalacion" icon="add" />
                {instalations.map(instalation => <div key={instalation.id}>
                    {instalation.name} {instalation.city}
                </div>)}
            </div> : <span>Activa tu suscripcion de nuevo</span>
        }
    </AppTemplate>
}
export default AdminPanel