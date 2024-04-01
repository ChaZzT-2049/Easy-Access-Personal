import { Instalations, PageTitle } from "../../../UI"
import { SkeletonInstalations } from "../../../components/Skeletons/Index"
import DisplayData from "../../../components/DisplayData/Index"
import useAppContext from "../../../hooks/useAppContext"
import useCollection from "../../../hooks/useCollection"
import useDocument from "../../../hooks/useDocument"
import AdminInstalations from "../../../components/Admin/Instalations"
import InstalationAdd from "../../../components/Admin/InstalationAdd"
const Panel = () => {
    const {appToast} = useAppContext()
    const {collData, loadingColl, errorColl, createCollDoc, updateCollDoc} = useCollection("instalations", {orderParams: {oField: "active", direction: "desc"},whereParams: {wField: "user", op: "==", value: localStorage.getItem("uid") || null}})
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
    return <>
        <PageTitle>Panel de Administrador</PageTitle>
        <Instalations>
            {document && document.active === true && document.type !== "Ir4PWX9f1jxAI34bBo2G" ?
                <section className="add">
                    <h2>Tus instalaciones:</h2>
                    <InstalationAdd action={addInstalation}/>
                </section> : <h2>Actualiza tu plan para agregar instalaciones.</h2>
            }
            <DisplayData data={collData} loading={loadingColl} error={errorColl} loader={<SkeletonInstalations />}
                noData={{message: "No tienes Instalaciones creadas.", content: "Intenta crear una instalacion."}}
            >
                {document && document.active === true ? 
                    <AdminInstalations 
                        data={collData} editAction={editInstalation} deactivate={deactivateInstalation}
                    />
                    : <span>Activa tu suscripcion de nuevo</span>
                }
            </DisplayData>
        </Instalations> 
    </>
}
export default Panel