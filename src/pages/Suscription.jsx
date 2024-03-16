import styled from "styled-components";
import { PageTitle } from "../UI";
import Btn from "../components/Button/Index"
import AppTemplate from "../components/Template/Index"
import useAppContext from "../hooks/useAppContext";
import useCollection from "../hooks/useCollection";
import useDoc from "../hooks/useDoc";
import { SkeletonPlans } from "../components/Skeletons/Index";
import MissingData from "../components/Missing/Index";
import { formatPrice } from "../helpers/formatPrice";
import useToggle from "../hooks/useToggle";
const PageContent = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const SuscriptionInfo = styled.div`
    padding: 1rem;
    border-radius: .5rem;
    transition: background-color 200ms ease;
    &.active{
        background-color: ${({theme}) => theme.primarycont};
        color: ${({theme}) => theme.onprimarycont};
    }
    &.inactive{
        background-color: ${({theme}) => theme.outline};
        color: ${({theme}) => theme.surfacev};
    }
`;
const Plan = styled.div`
    background-color: ${({theme}) => theme.surfacev};
    padding: 1rem;
    text-align: center;
    & h4{
        padding: .5rem;
        border-radius: .25rem;
        margin-bottom: .5rem;
        background-color: ${({theme}) => theme.secondary};
        color: ${({theme}) => theme.onsecondary};
    }
    & p{
        padding: .5rem;
        background-color: ${({theme}) => theme.okcont};
        color: ${({theme}) => theme.onokcont};
    }
`;
const SelectorSuscription = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem 0;
    & li{
        background: ${({theme}) => theme.outline};
        padding: .5rem 2rem;
        color: ${({theme}) => theme.surfacev};
        transition: all 200ms ease-in;
        cursor: pointer;
        &.selected{
            background: ${({theme}) => theme.secondary};
            color: ${({theme}) => theme.onsecondary};
        }
    }
`;
const Suscription = () =>{
    const {user, toasts} = useAppContext()
    const {toggle, trigger} = useToggle()
    const {data, loading, error, docUpdate} = useDoc("suscriptions", user.uid)
    const [plans, plansLoading, plansError] = useCollection("suscription-plans", "mensual")

    const updateSuscription = (type) => {
        docUpdate({type, active: true}).then(()=>{
            toasts.success("Suscripcion Actualizada", "Se ha actualizado tu suscripcion correctamente.")
        })
    }
    const toggleSuscription = () => {
        docUpdate({type: data.type, active: !data.active}).then(()=>{
            toasts.success("Suscripcion Actualizada", "Se ha actualizado tu suscripcion correctamente.")
        })
    }

    return <AppTemplate>
        <PageTitle>Datos de Suscripcion</PageTitle>
        <PageContent>
            <p>Personaliza la experiencia de tu cuenta en Aditum Delta con tu suscripción.</p>
            {loading ? <li>Loading...</li> : <>
                {error && <li>Error: {error}</li>}
                {data ? <SuscriptionInfo className={data.active ? "active" : "inactive"}>
                    <h3><b>{data.type}</b></h3>
                    <p>Estado: {data.active ? "Activa" : "Inactiva"}</p>
                    <Btn onClick={toggleSuscription} colors="primary oncont" action={data.active ? "Desactivar" : "Activar"}/>
                </SuscriptionInfo> : <MissingData message="Aun no tienes una suscripción." />
                }
            </>}
            {plansError && <li>Error: {plansError}</li>}
            {plansLoading ? <SkeletonPlans /> : <>
                <h3>Tipos de planes</h3>
                {plans.map(plan => <Plan key={plan.id}>
                    <h4>{plan.title}</h4>
                    <SelectorSuscription>
                        <li className={!toggle ? "selected" : ""} onClick={() => {trigger()}}>Mensual</li>
                        <li className={toggle ? "selected" : ""} onClick={() => {trigger()}}>Anual</li>
                    </SelectorSuscription>
                    <h2><b>{toggle ? formatPrice(plan.anual - (plan.anual * .15), plan.moneda) : formatPrice(plan.mensual, plan.moneda)}</b></h2>
                    {toggle && <small>Ahorra un 15%</small> }
                    <hr />
                    <ul>
                        {plan.features.map((feature, i) =>
                            <li key={plan.id + i}>{feature}</li>
                        )}
                    </ul>
                    {data && plan.title === data.type ? 
                    <p>Plan Actual</p> : 
                    <Btn onClick={()=>{updateSuscription(plan.title)}} colors="primary" action="Suscribirse" />}
                </Plan>)}
            </>
            }
        </PageContent>
    
    </AppTemplate>
}
export default Suscription