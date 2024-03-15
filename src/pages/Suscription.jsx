import styled from "styled-components";
import { PageTitle } from "../UI";
import Btn from "../components/Button/Index"
import AppTemplate from "../components/Template/Index"
import useAppContext from "../hooks/useAppContext";
import useCollection from "../hooks/useCollection";
import useDoc from "../hooks/useDoc";
import { SkeletonPlans } from "../components/Skeletons/Index";
const PageContent = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const SuscriptionInfo = styled.div`
    background-color: ${({theme}) => theme.primarycont};
    color: ${({theme}) => theme.onprimarycont};
    padding: 1rem;
    border-radius: .5rem;
`;
const Plan = styled.div`
    background-color: ${({theme}) => theme.surfacev};
    padding: 1rem;
`;
const Suscription = () =>{
    const {user, toasts} = useAppContext()
    const {data, loading, error, docUpdate} = useDoc("suscriptions", user.uid)
    const [plans, plansLoading, plansError] = useCollection("suscription-plans")

    const updateSuscription = (type) => {
        docUpdate({type, active: true}).then(()=>{
            toasts.success("Suscripcion Actualizada", "Se ha actualizado tu suscripcion correctamente.")
        })
    }

    return <AppTemplate>
        <PageTitle>Datos de Suscripcion</PageTitle>
        <PageContent>
            <p>Personaliza la experiencia de tu cuenta en Aditum Delta con tu suscripción.</p>
            {loading ? <li>Loading...</li> : <>
                {error && <li>Error: {error}</li>}
                {data ? <SuscriptionInfo>
                    <h3><b>{data.type}</b></h3>
                    <p>Estado: {data.active ? "Activa" : "Inactiva"}</p>
                </SuscriptionInfo> : <>Aun no tienes una suscripción.</>
                }
            </>}
            {plansError && <li>Error: {plansError}</li>}
            {plansLoading ? <SkeletonPlans /> : <>
                <h3>Tipos de planes</h3>
                {plans.map(plan => <Plan key={plan.id}>
                    <h4>{plan.title}</h4>
                    {data && plan.title === data.type ? 
                    <span>Plan Actual</span> : 
                    <Btn onClick={()=>{updateSuscription(plan.title)}} colors="primary" action="Suscribirse" />}
                </Plan>)}
            </>
            }
        </PageContent>
    
    </AppTemplate>
}
export default Suscription