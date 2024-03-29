import { PageTitle, Plan, Plans, SuscriptionInfo } from "../UI";
import Btn from "../components/Button/Index"
import AppTemplate from "../components/Template/Index"
import useAppContext from "../hooks/useAppContext";
import { SkeletonPlans, SkeletonSuscription } from "../components/Skeletons/Index";
import { formatPrice } from "../helpers/formatPrice";
import useToggle from "../hooks/useToggle";
import DisplayData from "../components/DisplayData/Index";
import useCollection from "../hooks/useCollection";
import useDocument from "../hooks/useDocument";
const Suscription = () =>{
    const {appToast, suscription, updateSuscription} = useAppContext()
    const {toggle, trigger} = useToggle()
    const {collection, loadingColl, errorColl} = useCollection("suscription-plans", {orderParams: {oField: "mensual"}})
    const {document, loadingDoc, errorDoc} = useDocument("suscriptions", localStorage.getItem("uid") || null)
    const updateSuscriptionPlan = async(type) => {
        updateSuscription({type: type, active: suscription.active}).then(()=>{
            appToast.success("Operacion exitosa", "Se ha actualizado tu suscripcion")
        })
    }
    const toggleSuscription = async() => {
        updateSuscription({type: suscription.type, active: !suscription.active}).then(()=>{
            appToast.success("Cambio Exitoso", "Se desactivado tu suscripcion")
        })
    }
    return <AppTemplate>
        <PageTitle>Datos de Suscripcion</PageTitle>
        <p>Personaliza la experiencia de tu cuenta en Aditum Delta con tu suscripción.</p>
        <DisplayData data={document} loading={loadingDoc} error={errorDoc} loader={<SkeletonSuscription/>} 
            noData={{message: "Aun no tienes una suscripción.", content: "Adquiere uno de nuestros planes y disfruta sus beneficios."}}
        >
            <SuscriptionInfo className={document?.active ? "active" : "inactive"}>
                <h3><b>{document?.type}</b></h3>
                <p>Estado: {document?.active ? "Activa" : "Inactiva"}</p>
                <Btn onClick={toggleSuscription} colors="primary oncont" action={document?.active ? "Desactivar" : "Activar"}/>
            </SuscriptionInfo>
        </DisplayData>
        <h3>Tipos de planes</h3>
        <DisplayData data={collection} loading={loadingColl} error={errorColl} loader={<SkeletonPlans />} 
            noData={{message: "No hemos podido cargar los planes.", content: "Espera un momento."}}
        >     
            <Plans>
                {collection?.map(plan => 
                    <Plan key={plan.id}>
                        <h4>{plan.title}</h4>
                        <ul className="selector">
                            <li className={!toggle ? "selected" : ""} onClick={() => {trigger()}}>Mensual</li>
                            <li className={toggle ? "selected" : ""} onClick={() => {trigger()}}>Anual</li>
                        </ul>
                        <h2><b>{toggle ? formatPrice(plan.anual - (plan.anual * .15), plan.moneda) : formatPrice(plan.mensual, plan.moneda)}</b></h2>
                        {toggle && <small>Ahorra un 15%</small> }
                        <hr />
                        <ul className="features">
                            {plan.features.map((feature, i) =>
                                <li key={plan.id + i}>{feature}</li>
                            )}
                        </ul>
                        <Btn disabled={(document && plan.title === document.type)}
                            onClick={()=>{updateSuscriptionPlan(plan.title)}} colors="primary" 
                            action={document && plan.title === document.type ? "Plan Actual" : "Suscribirse"} 
                        />
                    </Plan>
                )}
            </Plans>
        </DisplayData>
    </AppTemplate>
}
export default Suscription