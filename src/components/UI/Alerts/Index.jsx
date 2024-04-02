import styled from "styled-components"
import useAppContext from "../../../hooks/app/useAppContext";
import Icon from "../Icon/Index";

const AlertsContainer = styled.ul`
    position: fixed;
    right: 0;
    box-sizing: border-box;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 90%;
    max-width: 480px;
    margin: 0 auto;
    transition: 200ms ease-in;
    @media screen and (min-width: 0px) and (max-width: 480px) {align-items: center;}
    & li{
        @media screen and (min-width: 0px) and (max-width: 480px) {width: 100%;}
        box-sizing: border-box;
        padding: .5rem 1rem;
        border-radius: .25rem;
        display: flex;
        align-items: center;
        gap: .5rem;
        margin: .25rem 0;
        justify-content: space-between;
        animation: show 1s ease, hide 1s ease 2.5s forwards;
        @keyframes show {
            from {
                opacity: .1;
                translate: 100%;
            }
            to{
                opacity: 1;
                translate: 0%;
            }
        }
        @keyframes hide {
            from {
                opacity: 1;
                translate: 0%;
            }
            to{
                opacity: 0;
                translate: 100%;
            }
        }
        & .content{
            display: flex;
            gap: .5rem;
            align-items: center;
            & i {font-size: 2rem;}
            & div{
                display: flex;
                flex-direction: column;
                gap: .25rem;
                border-left: 2px solid currentColor;
                padding-left: .5rem;
            }
        }
        &.info{
            background: ${({theme}) => theme.primary};
            color: ${({theme}) => theme.onprimary};
        }
        &.success{
            background: ${({theme}) => theme.ok};
            color: ${({theme}) => theme.onok};
        }
        &.warning{
            background: ${({theme}) => theme.alert};
            color: ${({theme}) => theme.alertcont};
        }
        &.error{
            background: ${({theme}) => theme.error};
            color: ${({theme}) => theme.onerror};
        }
    }
`;
const Alerts = () => {
    const {alerts, appToast} = useAppContext()
    const variants = {
        info: "info",
        success: "check",
        warning: "warning",
        error: "report"
    }
    return <AlertsContainer>
        {alerts.map((alert, i) => 
            <li key={i} className={alert.variant}>
                <div className="content">
                    <i className="material-icons">{variants[alert.variant]}</i>
                    <div>
                        <b>{alert.title}</b>
                        <small>{alert.message}</small>
                    </div>
                </div>
                <Icon onClick={()=>{appToast.delete(alert.id)}} icon="close"/>
            </li>
        )}
    </AlertsContainer>
}
export default Alerts