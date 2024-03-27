import { PageTitle, Plan, Plans, SuscriptionInfo } from "../UI";
import Btn from "../components/Button/Index"
import AppTemplate from "../components/Template/Index"
import useAppContext from "../hooks/useAppContext";
import { SkeletonPlans, SkeletonSuscription } from "../components/Skeletons/Index";
import { formatPrice } from "../helpers/formatPrice";
import useToggle from "../hooks/useToggle";
import DisplayData from "../components/DisplayData/Index";
import { crudCollection, crudDoc } from "../firebase.crud";
const susPlans = crudCollection("suscription-plans", {orderParams: {oField: "mensual"}})
const susDoc = crudDoc("suscriptions", localStorage.getItem("uid") || null)
const Suscription = () =>{
    const {appToast} = useAppContext()
    const {toggle, trigger} = useToggle()
    const plans = susPlans.read()
    let suscription = susDoc.read()
    const updateSuscription = (type) => {
        suscription = susDoc.update({type, active: true}).then(()=>{
            appToast.success("Suscripcion Actualizada", "Se ha actualizado tu suscripcion correctamente.")
        })
    }
    const toggleSuscription = () => {
        suscription = susDoc.update({type: suscription?.data.type, active: !suscription?.data.active}).then(()=>{
            appToast.success("Suscripcion Actualizada", "Se ha actualizado tu suscripcion correctamente.")
        })
    }
    return <AppTemplate>
        <PageTitle>Datos de Suscripcion</PageTitle>
        <p>Personaliza la experiencia de tu cuenta en Aditum Delta con tu suscripción.</p>
        <DisplayData data={suscription?.data} error={suscription?.error} loader={<SkeletonSuscription/>} 
            noData={{message: "Aun no tienes una suscripción.", content: "Adquiere uno de nuestros planes y disfruta sus beneficios."}}
        >
            <SuscriptionInfo className={suscription?.data.active ? "active" : "inactive"}>
                <h3><b>{suscription?.data.type}</b></h3>
                <p>Estado: {suscription?.data.active ? "Activa" : "Inactiva"}</p>
                <Btn onClick={toggleSuscription} colors="primary oncont" action={suscription?.data.active ? "Desactivar" : "Activar"}/>
            </SuscriptionInfo>
        </DisplayData>
        <h3>Tipos de planes</h3>
        <DisplayData data={plans?.data} error={plans?.error} loader={<SkeletonPlans />} 
            noData={{message: "No hemos podido cargar los planes.", content: "Espera un momento."}}
        >     
            <Plans>
                {plans?.data && plans.data?.map(plan => <Plan key={plan.id}>
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
                    <Btn disabled={(suscription?.data && plan.title === suscription?.data.type)}
                        onClick={()=>{updateSuscription(plan.title)}} colors="primary" 
                        action={suscription?.data && plan.title === suscription?.data.type ? "Plan Actual" : "Suscribirse"} 
                    />
                    </Plan>
                )}
            </Plans>
        </DisplayData>
    </AppTemplate>
}
export default Suscription