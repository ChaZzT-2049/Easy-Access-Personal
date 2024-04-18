import { PageTitle } from "../../../styled/index";
import { SkeletonPlans, SkeletonSuscription } from "../../../components/UI/Skeletons/Index";
import DisplayData from "../../../components/DisplayData/Index";
import Btn from "../../../components/UI/Button/Index"
import useAppContext from "../../../hooks/app/useAppContext";
import useToggle from "../../../hooks/useToggle";
import useCollection from "../../../hooks/data/useCollection";
import useDocument from "../../../hooks/data/useDocument";
import isActive from "../../../utils/isActive";
import formatPrice from "../../../utils/formatPrice";
import styled from "styled-components";
export const Plans = styled.section`
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
        &.skeleton{transition-delay: 200ms;}
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
        &.skeleton{transition-delay: 400ms;}
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
        &.skeleton{transition-delay: 600ms;}
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
        &.skeleton{transition-delay: 800ms;}
    }
`;
export const Plan = styled.div`
    flex: 0 1 325px;
    background-color: ${({theme}) => theme.surfacev};
    text-align: center;
    & h4{
        padding: .5rem;
        border-radius: .25rem;
        margin-bottom: .5rem;
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
    & .discount{
        font-size: 1rem;
        display: flex;
        justify-content: center;
        opacity: 0;
        font-weight: 300;
        transition: opacity 300ms ease, font-weight 300ms ease;
        color: ${({theme}) => theme.onprimarycont};
        &.visible{
            opacity: 1;
            font-weight: 700;
        }
    }
    & .features{
        padding: .5rem 1rem;
    }
    & .features li{
        text-align: left;
        margin-bottom: .5rem;
        &::first-letter{text-transform: uppercase;}
        &::after{content:"."}
    }
    & button{
        margin-bottom: 1rem;
    }
    &.skeleton{
        & h4{height: 1.125rem;}& h2{height: 1.25rem; width: 50%; margin-inline: auto;}
        & h2, .features li{
            background-color: ${({theme}) => theme.onsurfv};
        }
        .selector li{height: 1rem;width: 2rem;}
        & .features li{height: 1rem;width: 60%; &:last-child{width: 40%;}}
    }
`;
export const SuscriptionInfo = styled.div`
    padding: 1rem;
    border-radius: .5rem;
    transition: background-color 200ms ease;
    margin: 1rem auto;
    max-width: 600px;
    &.active{
        background: ${({theme}) => theme.primarycont};
        color: ${({theme}) => theme.onprimarycont};
    }
    &.inactive{
        background: ${({theme}) => theme.outline};
        color: ${({theme}) => theme.surfacev};
    }
    &.skeleton{
        background: ${({theme}) => theme.surfacev};
        & h3, p{width: 25%; height: 1rem; background: ${({theme}) => theme.onsurfv}; margin-bottom: .5rem;}
    }
`;
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