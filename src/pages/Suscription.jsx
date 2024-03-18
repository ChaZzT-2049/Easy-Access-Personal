import styled from "styled-components";
import { PageTitle, Plan, Plans } from "../UI";
import Btn from "../components/Button/Index"
import AppTemplate from "../components/Template/Index"
import useAppContext from "../hooks/useAppContext";
import useCollection from "../hooks/useCollection";
import useDoc from "../hooks/useDoc";
import { SkeletonPlans } from "../components/Skeletons/Index";
import { formatPrice } from "../helpers/formatPrice";
import useToggle from "../hooks/useToggle";
import DisplayData from "../components/DisplayData/Index";
const SuscriptionInfo = styled.div`
    padding: 1rem;
    border-radius: .5rem;
    transition: background-color 200ms ease;
    margin: 1rem auto;
    max-width: 600px;
    &.active{
        background-color: ${({theme}) => theme.primarycont};
        color: ${({theme}) => theme.onprimarycont};
    }
    &.inactive{
        background-color: ${({theme}) => theme.outline};
        color: ${({theme}) => theme.surfacev};
    }
`;
const Suscription = () =>{
    const {user, toasts} = useAppContext()
    const {toggle, trigger} = useToggle()
    const {data, loading, error, docUpdate} = useDoc("suscriptions", user.uid)
    const {type, active} = data || {type: "", active: false}
    const [plans, plansLoading, plansError] = useCollection("suscription-plans", "mensual")

    const updateSuscription = (type) => {
        docUpdate({type, active: true}).then(()=>{
            toasts.success("Suscripcion Actualizada", "Se ha actualizado tu suscripcion correctamente.")
        })
    }
    const toggleSuscription = () => {
        docUpdate({type: type, active: !active}).then(()=>{
            toasts.success("Suscripcion Actualizada", "Se ha actualizado tu suscripcion correctamente.")
        })
    }

    return <AppTemplate>
        <PageTitle>Datos de Suscripcion</PageTitle>
            <p>Personaliza la experiencia de tu cuenta en Aditum Delta con tu suscripción.</p>
            <DisplayData loading={loading} error={error} data={data} loader={<li>Cargando</li>} 
                noData={{message: "Aun no tienes una suscripción.", content: "Adquiere uno de nuestros planes y disfruta sus beneficios."}}
            >
                <SuscriptionInfo className={active ? "active" : "inactive"}>
                    <h3><b>{type}</b></h3>
                    <p>Estado: {active ? "Activa" : "Inactiva"}</p>
                    <Btn onClick={toggleSuscription} colors="primary oncont" action={active ? "Desactivar" : "Activar"}/>
                </SuscriptionInfo>
            </DisplayData>
        <DisplayData loading={plansLoading} error={plansError} data={plans} loader={<SkeletonPlans />} noData="No hay planes activos.">
            <h3>Tipos de planes</h3>
            <Plans>
                {plans.map(plan => <Plan key={plan.id}>
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
                    <Btn disabled={(data && plan.title === type)}
                        onClick={()=>{updateSuscription(plan.title)}} colors="primary" 
                        action={data && plan.title === type ? "Plan Actual" : "Suscribirse"} 
                    />
                </Plan>)}
            </Plans>
        </DisplayData>
    </AppTemplate>
}
export default Suscription