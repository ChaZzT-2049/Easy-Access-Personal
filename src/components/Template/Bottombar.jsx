import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Icon from "../Icon/Index";

const Footer = styled.footer`
    display: none;
    padding: .5rem;
    color: ${({theme}) => theme.primary};
    border-top: 3px solid ${({theme}) => theme.primary};
    background: ${({theme}) => theme.bg};

    position: sticky;
    bottom: 0;
    & nav{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    @media screen and (min-width: 0px) and (max-width: 480px) {display: block;}
`;
const FooterTab = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .25rem;
    cursor: pointer;            
    text-decoration: none;            
    color: inherit;            
    font-size: .8rem;  
    padding: 0 .125rem;
    border-bottom: 2px solid ${({theme}) => theme.bg};
    transition: all 300ms linear;

    &:hover i{
        background: ${({theme}) => theme.primarycont};
        outline: 1px solid ${({theme}) => theme.primary};
    }
    &.active{
        border-bottom: 2px solid ${({theme}) => theme.primary};
        border-radius: .125rem;

        & i{
            background: ${({theme}) => theme.onprimarycont};
            color: ${({theme}) => theme.primarycont};
        }
    }
`;

const Bottombar = ({page}) => {
    return <Footer>
        <nav>
            <FooterTab  to="/home"><Icon icon="home" />Home</FooterTab>
            <FooterTab  to="/asignaciones"><Icon icon="supervisor_account"/>Asignaciones</FooterTab>
            <FooterTab  to="/"><Icon icon="directions_car"/>Vehiculos</FooterTab>
            <FooterTab  to="/"><Icon icon="notifications"/>Notificaciones</FooterTab>
        </nav>
    </Footer>
}

export default Bottombar;