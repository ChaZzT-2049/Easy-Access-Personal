import AppTemplate from "../components/Template/Index"
import { Instalations, PageTitle } from "../UI"
import { SkeletonInstalations } from "../components/Skeletons/Index"
import DisplayData from "../components/DisplayData/Index"
import useAppContext from "../hooks/useAppContext"
import useCollection from "../hooks/useCollection"
import useDocument from "../hooks/useDocument"
import AdminInstalations from "../components/Admin/Instalations"
import InstalationAdd from "../components/Admin/InstalationAdd"
const AdminPanel = () => {
    const {appToast} = useAppContext()
    const {collection, loadingColl, errorColl, createCollDoc, updateCollDoc} = useCollection("instalations", {whereParams: {wField: "user", op: "==", value: localStorage.getItem("uid") || null}})
    const {document} = useDocument("suscriptions", localStorage.getItem("uid") || null)
    const addInstalation = async(data) => {
        createCollDoc(data).then(()=>{
            appToast.success("Creacion Exitosa", "Se ha creado tu instalacion")
        })
    }
    const editInstalation = async(id, data) =>{
        updateCollDoc(id, data).then(()=>{
            appToast.success("Instalación Actualizada", "Se ha actualizado tu instalación")
        })
    }
    const deactivateInstalation = async(id, data) => {
        updateCollDoc(id, data).then(()=>{
            appToast.success("Instalación Actualizada", `Se ha ${data.active ? "activado" : "desactivado"} tu instalación`)
        })
    }
    return <AppTemplate>
        <PageTitle>Panel de Administrador</PageTitle>
        <Instalations>
            <DisplayData data={collection} loading={loadingColl} error={errorColl} loader={<SkeletonInstalations />}
                noData={{message: "No tienes Instalaciones creadas.", content: "Intenta crear una instalacion."}}
            >
                {document && document.active === true ?
                    <>
                        <section>
                            <h2>Tus instalaciones:</h2>
                            <InstalationAdd action={addInstalation}/>
                        </section>
                        <AdminInstalations data={collection} editAction={editInstalation} deactivate={deactivateInstalation}/>
                    </>
                    : <span>Activa tu suscripcion de nuevo</span>
                }
            </DisplayData>
        </Instalations> 
    </AppTemplate>
}
export default AdminPanel