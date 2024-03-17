import styled from "styled-components";
import { PageTitle } from "../UI";
import Btn from "../components/Button/Index"
import AppTemplate from "../components/Template/Index"
import useAppContext from "../hooks/useAppContext";
import useCollection from "../hooks/useCollection";
import useDoc from "../hooks/useDoc";
import { SkeletonPlans } from "../components/Skeletons/Index";
import { formatPrice } from "../helpers/formatPrice";
import useToggle from "../hooks/useToggle";
import DisplayData from "../components/DisplayData/Index";
const PageContent = styled.section`
    
`;
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
const Plans = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
    & :nth-child(1){
        & h4, .selector li.selected{
            background-color: ${({theme}) => theme.onsurfv};
            color: ${({theme}) => theme.surfacev};
        }
        & .selector li{
            background-color: ${({theme}) => theme.outline};
            color: ${({theme}) => theme.surfacev};
        }
        
    }
    & :nth-child(2){
        & h4, .selector li.selected{
            background-color: ${({theme}) => theme.secondary};
            color: ${({theme}) => theme.onsecondary};
        }
        & .selector li{
            background-color: ${({theme}) => theme.secondarycont};
            color: ${({theme}) => theme.onsecondarycont};
        }
    }
    & :nth-child(3){
        & h4, .selector li.selected{
            background-color: ${({theme}) => theme.primary};
            color: ${({theme}) => theme.onprimary};
        }
        & .selector li{
            background-color: ${({theme}) => theme.primarycont};
            color: ${({theme}) => theme.onprimarycont};
        }
    }
    & :nth-child(4){
        & h4, .selector li.selected{
            background-color: ${({theme}) => theme.onprimarycont};
            color: ${({theme}) => theme.onprimary};
        }
        & .selector li{
            background-color: ${({theme}) => theme.primarycont};
            color: ${({theme}) => theme.onprimarycont};
        }
    }
`;
const Plan = styled.div`
    flex: 0 1 350px;
    background-color: ${({theme}) => theme.surfacev};
    padding: 1rem;
    text-align: center;
    & h4{
        padding: .5rem;
        border-radius: .25rem;
        margin-bottom: .5rem;
    }
    & p{
        padding: .5rem;
        background-color: ${({theme}) => theme.okcont};
        color: ${({theme}) => theme.onokcont};
    }
    & .selector{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .5rem 0;
        & li{
            padding: .5rem 2rem;
            transition: all 200ms ease-in;
            cursor: pointer;
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
            <DisplayData loading={loading} error={error} data={data} loader={<li>Cargando</li>} noData="Aun no tienes una suscripción">
                <SuscriptionInfo className={data.active ? "active" : "inactive"}>
                    <h3><b>{data.type}</b></h3>
                    <p>Estado: {data.active ? "Activa" : "Inactiva"}</p>
                    <Btn onClick={toggleSuscription} colors="primary oncont" action={data.active ? "Desactivar" : "Activar"}/>
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
                        <ul>
                            {plan.features.map((feature, i) =>
                                <li key={plan.id + i}>{feature}</li>
                            )}
                        </ul>
                        <Btn disabled={(data && plan.title === data.type)}
                            onClick={()=>{updateSuscription(plan.title)}} colors="primary" 
                            action={data && plan.title === data.type ? "Plan Actual" : "Suscribirse"} 
                        />
                    </Plan>)}
                </Plans>
            </DisplayData>
        </PageContent>
    
    </AppTemplate>
}
export default Suscription