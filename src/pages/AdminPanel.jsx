import AppTemplate from "../components/Template/Index"
import Btn from "../components/Button/Index"
import {Instalation, Instalations, PageTitle } from "../UI"
import FormInstalation from "../components/Form/Forms/Instalations"
import { crudCollection, crudDoc } from "../firebase.crud"
import { SkeletonInstalations } from "../components/Skeletons/Index"
import DisplayData from "../components/DisplayData/Index"
import useAppContext from "../hooks/useAppContext"

const instCrud = crudCollection("instalations", {whereParams: {wField: "user", op: "==", value: localStorage.getItem("uid") || null}})
const susDoc = crudDoc("suscriptions", localStorage.getItem("uid") || null)

const AdminPanel = () => {
    const {appToast} = useAppContext()
    let instalations = instCrud.read()
    const suscription = susDoc.read()
    console.log("render")
    const addInstalation = (data) => {
        instalations = instCrud.create(data).then(()=>{
            appToast.success("Instalacion Creada", "Se ha creado la instalacion exitosamente")
        })
    }
    return <AppTemplate>
        <PageTitle>Panel de Administrador</PageTitle>
        {suscription?.data && suscription?.data.active === true ?
           <Instalations>
                <section>
                    <h2>Tus instalaciones:</h2>
                    <FormInstalation action={addInstalation}/>
                </section>
                <DisplayData data={instalations?.data} error={instalations?.error} loader={<SkeletonInstalations />}
                    noData={{message: "No tienes Instalaciones creadas.", content: "Intenta crear una instalacion."}}
                >
                    <ul>{instalations?.data && instalations.data?.map(instalation =>
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
    </AppTemplate>
}
export default AdminPanel