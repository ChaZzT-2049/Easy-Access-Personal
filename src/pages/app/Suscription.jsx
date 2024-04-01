import { PageTitle, Plan, Plans, SuscriptionInfo } from "../../UI";
import Btn from "../../components/Button/Index"
import useAppContext from "../../hooks/useAppContext";
import { SkeletonPlans, SkeletonSuscription } from "../../components/Skeletons/Index";
import { formatPrice } from "../../helpers/formatPrice";
import useToggle from "../../hooks/useToggle";
import DisplayData from "../../components/DisplayData/Index";
import useCollection from "../../hooks/useCollection";
import useDocument from "../../hooks/useDocument";
import { isActive } from "../../helpers/isActive";
const Suscription = () =>{
    const {appToast} = useAppContext()
    const {toggle, trigger} = useToggle()
    const {collData, loadingColl, errorColl} = useCollection("suscription-plans", {orderParams: {oField: "mensual"}})
    const {document, loadingDoc, errorDoc, updateDoc} = useDocument("suscriptions", localStorage.getItem("uid") || null)
    const {type, active, display} = document || {type: "", active: false, display: ""}
    const updateSuscriptionPlan = async(type, name) => {
        updateDoc({type: type, display: name, active: active}).then(()=>{
            appToast.success("Operacion exitosa", "Se ha actualizado tu suscripcion")
        })
    }
    const toggleSuscription = async() => {
        updateDoc({active: !active}).then(()=>{
            appToast.success("Cambio Exitoso", "Se desactivado tu suscripcion")
        })
    }
    return <>
        <PageTitle>Datos de Suscripcion</PageTitle>
        <p>Personaliza la experiencia de tu cuenta en Aditum Delta con tu suscripción.</p>
        <DisplayData data={document} loading={loadingDoc} error={errorDoc} loader={<SkeletonSuscription/>} 
            noData={{message: "Aun no tienes una suscripción.", content: "Adquiere uno de nuestros planes y disfruta sus beneficios."}}
        >
            <SuscriptionInfo className={isActive(active)}>
                <h3><b>{display}</b></h3>
                <p>Estado: {isActive(active, "Activa", "Inactiva")}</p>
                <Btn onClick={toggleSuscription} colors="primary oncont" action={isActive(active, "Activar", "Desactivar", true)}/>
            </SuscriptionInfo>
        </DisplayData>
        <h3>Tipos de planes</h3>
        <DisplayData data={collData} loading={loadingColl} error={errorColl} loader={<SkeletonPlans />} 
            noData={{message: "No hemos podido cargar los planes.", content: "Espera un momento."}}
        >     
            <Plans>
                {collData?.map(plan => 
                    <Plan key={plan.id}>
                        <h4>{plan.title}</h4>
                        <ul className="selector">
                            <li className={!toggle ? "selected" : ""} onClick={() => {trigger()}}>Mensual</li>
                            <li className={toggle ? "selected" : ""} onClick={() => {trigger()}}>Anual</li>
                        </ul>
                        <h2><b>{toggle ? formatPrice(plan.anual - (plan.anual * .15), plan.moneda) : formatPrice(plan.mensual, plan.moneda)}</b></h2>
                        <span className={`discount ${toggle && plan.anual > 0 ? "visible" : ""}`}>Ahorra un 15%</span>
                        <hr />
                        <ul className="features">
                            <li>solicita acceso a instalaciones</li>
                            <li>obten QR's de acceso</li>
                            <li>agrega vehiculos</li>
                            <li>{plan.features.instalations ? `crea y gestiona ${plan.features.instalations === "unlimited" ? "instalaciones ilimitadas" : `hasta ${plan.features.instalations > 1 ? `${plan.features.instalations} instalaciones` : `${plan.features.instalations} instalación`}`}`  : "sin creación de instalaciones"}</li>
                            <li>{plan.features.users ? `agrega ${plan.features.users === "unlimited" ? "usuarios ilimitados" : `hasta ${plan.features.users} usuarios`}`  : "sin gestión de usuarios"}</li>
                            <li>{plan.features.guests ? `agrega ${plan.features.guests === "unlimited" ? "invitados ilimitados" : `hasta ${plan.features.guests} invitados`}`  : "sin gestión de invitados"}</li>
                            <li>{plan.features.it_integrations ? "integración de tecnologías" : "sin integración de tecnologías"}</li>
                            <li>{plan.features.qr_scanning ? "escanea QR's de acceso" : "sin escaneo QR"}</li>
                            <li>{plan.features.statistics ? "obten estadisticas" : "sin estadisticas"}</li>
                            <li>{plan.features.apply_filters ? "aplica filtros" : "sin filtros"}</li>
                        </ul>
                        <Btn disabled={(document && plan.id === type)}
                            onClick={()=>{updateSuscriptionPlan(plan.id, plan.title)}} colors="primary" 
                            action={document && plan.id === type ? "Plan Actual" : "Suscribirse"} 
                        />
                    </Plan>
                )}
            </Plans>
        </DisplayData>
    </>
}
export default Suscription