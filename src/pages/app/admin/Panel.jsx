import { Instalations, PageTitle } from "../../../styled"
import { SkeletonInstalations } from "../../../components/UI/Skeletons/Index"
import DisplayData from "../../../components/DisplayData/Index"
import useAppContext from "../../../hooks/app/useAppContext"
import useCollection from "../../../hooks/data/useCollection"
import useDocument from "../../../hooks/data/useDocument"
import AdminInstalations from "../../../features/Admin/Instalations/Instalations"
import InstalationAdd from "../../../features/Admin/Instalations/InstalationAdd"
import MonitorInstalations from "../../../features/Monitor/Instalations"
const Panel = () => {
    const {appToast, user} = useAppContext()
    const {collData, loadingColl, errorColl, createCollDoc, updateCollDoc} = useCollection("instalations", {orderParams: {oField: "active", direction: "desc"},
    whereParams: [
        {wField: "user", op: "==", value: localStorage.getItem("uid") || null}
    ]})
    const {document} = useDocument("suscriptions", localStorage.getItem("uid") || null)
    const monitors = useCollection("inscriptions", {whereParams: [
        {wField: "userID", op: "==", value: localStorage.getItem("uid") || user?.uid || null},
        {wField: "monitor", op: "==", value: true}
    ]})
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
    const editMonitoringInstalation = async(id, data) => {
        updateCollDoc(id, data).then(()=>{
            appToast.success("Instalación Actualizada", "Se ha actualizado la instalación")
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
        <br />
        <h2>Instalaciones que puedes monitorear</h2>
        <br />
        <DisplayData data={monitors.collData} loading={monitors.loadingColl} error={errorColl.loading} loader={<SkeletonInstalations/>}
            noData={{message: "No hay instalaciones por monitorear.", content: "Espera a que te den permisos."}}
        > 
            <MonitorInstalations data={monitors.collData} editAction={editMonitoringInstalation}/>
        </DisplayData>
    </>
}
export default Panel