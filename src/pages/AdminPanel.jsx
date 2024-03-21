import AppTemplate from "../components/Template/Index"
import Btn from "../components/Button/Index"
import useAppContext from "../hooks/useAppContext"
import useDoc from "../hooks/useDoc"
import { Instalation, Instalations, PageTitle } from "../UI"
import useCollection from "../hooks/useCollection"
import DisplayData from "../components/DisplayData/Index"
import { SkeletonInstalations } from "../components/Skeletons/Index"
import useDialog from "../hooks/useDialog"
import Modal from "../components/Modal/Index"
const AdminPanel = () => {
    const {user} = useAppContext()
    const susDoc = useDoc("suscriptions", user.uid)
    const [instalations, loading, error ] = useCollection("instalations","", `user:==:${user.uid}`)
    const create = useDialog()
    return <AppTemplate>
        <PageTitle>Panel de Administrador</PageTitle>
        {susDoc.data && susDoc.data.active ? 
           <Instalations>   
                <h2>
                    Tus instalaciones:
                    <Btn onClick={create.trigger} type="icon" colors="primary" action="Crear Instalacion" icon="add_box" />
                </h2>
                <DisplayData data={instalations} error={error} loading={loading} loader={<SkeletonInstalations />}
                    noData={{message: "No tienes Instalaciones creadas.", content: "Intenta crear una instalacion."}}
                >
                    <ul>{instalations.map(instalation => 
                        <Instalation key={instalation.id}>
                            <div>
                                <h4>{instalation.name}</h4>
                                <p>{instalation.city}</p>
                                <div className="actions">
                                    <Btn colors="primary" type="only-icon" icon="create"/>
                                    <Btn colors="primary" type="only-icon" icon="open_in_new"/>
                                </div>
                            </div>
                            <i className="material-icons icon">{instalation.icon}</i>
                        </Instalation>)}
                    </ul>
                    </DisplayData>
            </Instalations> : <span>Activa tu suscripcion de nuevo</span>
        }
        <Modal controls={create}>
            <h2>Crear Instalacion</h2>
        </Modal>
    </AppTemplate>
}
export default AdminPanel