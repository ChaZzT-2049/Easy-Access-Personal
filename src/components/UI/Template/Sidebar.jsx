import styled from "styled-components";
import Icon from "../Icon/Index";
import Logo from "../Logo/Index"
import { useLocation } from "react-router-dom";
import useAppContext from "../../../hooks/app/useAppContext";
import useAuth from "../../../hooks/app/useAuth";
import SidebarTab from "./SidebarTab";
import Btn from "../Button/Index";
const AsideContainer = styled.dialog`
    background: ${({theme}) => theme.bg};
    transition: all 300ms ease-in-out;
    border: none;
    outline: none;
    width: max-content;
    box-shadow: 8px 0px 15px rgba(0, 0, 0, 0.4);
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    left: -50vw;
    bottom: 0;
    box-sizing: border-box;
    height: 100%;
    max-height: 100%;
    opacity: 0;

    &[open]{
        left: 0;
        opacity: 1;
        transition: all 300ms ease-in-out;
    }

    @starting-style {
        &[open] {
            opacity: 0;
            left: -50vw;
            transition: all 300ms ease-in-out;
        }
    }
    &::backdrop{
        background: #00000000;
        transition: all 300ms ease-in-out;
        cursor: pointer;
    }
    &[open]::backdrop{
        background: #0000007a;
        transition: all 300ms ease-in-out;
    }
    @starting-style {
        &[open]::backdrop{
            background: #00000000;
            transition: all 300ms ease-in-out;
        }
    }

`;
const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
    & .logo{
        padding: 1rem;
        margin: 0 auto;
    }
`;
const Head = styled.section`
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    gap: 1rem;
    background: ${({theme}) => theme.primary};
    border-bottom: 3px solid ${({theme}) => theme.primary};
    color: ${({theme}) => theme.onprimary};
    & h2{line-height: normal;}

    @media screen and (min-width: 0px) and (max-width: 480px) {
        &{
        padding: 1rem .5rem;
    }
        & h2{
            font-size: 1.17rem;
        }
    }
`;

const Content = styled.div`
    flex-grow: 1;
    padding: 0 .5rem .5rem .5rem;
`;

const Section = styled.nav`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: .5rem 0;
    border-bottom: 2px solid ${({theme}) => theme.primary};
    transition: all 300ms ease-in;

`;
const NavBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({theme}) => theme.primary};
    text-decoration: none;
    border-radius: .5rem;
    padding-left: 0;
    padding-right: .125rem;
    transition: all 300ms ease-in;
    cursor: pointer;
    &:hover, &:focus{
        background: ${({theme}) => theme.primarycont};
        padding-left: .5rem;
        outline: 2px solid ${({theme}) => theme.primary}
    }
`;

const ProfileSection = styled(Section)`
    color: ${({theme}) => theme.onbg};
    & img{
        align-self: center;
        width: 30%;
        border-radius: 100%;
        border: 4px inset ${({theme}) => theme.primarycont};
        &.no-photo{
            width: 4rem;
            height: 4rem;
            background: ${({theme}) => theme.outline};
            color: ${({theme}) => theme.surfacev};
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &::after{
                content: "\\e853";
                font-size: 3rem;
                font-family: Material Icons;
                text-align: center;
            }
        }
    }
    & h4{
        text-align: center;
        font-weight: 300;
    }
    & small{
        text-align: center;
    }
`;
 
const Sidebar = ({controls}) => {
    const {closeOutside, trigger, ref} = controls
    const {user} = useAppContext()
    const {logout} = useAuth()
    const location = useLocation()
    return <AsideContainer onClick={(e) =>{closeOutside(e)}} ref={ref}>
        <Aside>
            <Head>
                <Btn onClick={()=>{trigger()}} icon="close" type="only-icon" colors="primary" />
                <h2>Menú</h2>
            </Head>
            <Content>
                <ProfileSection>
                    <img className={!user.photoURL ? "no-photo" : "" } src={ user?.photoURL} referrerPolicy="no-referrer" alt="user" />
                    <h4>{ user?.displayName || "Usuario"}</h4>
                    <small>{ user?.email}</small>
                </ProfileSection>
                <Section>
                    <SidebarTab link="/home" title="Home" icon="home" handleSidebar={trigger}/>
                    <SidebarTab link="/admin/panel" title="Panel Administrador" icon="dashboard" handleSidebar={trigger}/>
                    <SidebarTab link="/" title="Mis Vehiculos" icon="directions_car" handleSidebar={trigger} />
                    <SidebarTab link="/asignaciones" title="Usuarios Asignados" icon="supervisor_account" handleSidebar={trigger} />
                    <SidebarTab link="/" title="Notificaciones" icon="notifications" handleSidebar={trigger} />
                </Section>
                <Section>
                    <SidebarTab link="/user/perfil" title="Perfil de Usuario" icon="account_circle" handleSidebar={trigger} />
                    <SidebarTab link="/user/suscription" title="Suscripción" icon="credit_card" handleSidebar={trigger} />
                    <NavBtn onClick={() => {
                        localStorage.setItem("previous", location.pathname)
                        trigger()
                        logout();
                    }}>
                        Cerrar Sesión
                        <Icon icon="logout" />
                    </NavBtn>
                </Section>
                <Section>
                    <SidebarTab link="/" title="Ayuda" icon="help" handleSidebar={trigger} />
                    <SidebarTab link="/" title="Accesibilidad" icon="accessibility" handleSidebar={trigger} />
                    <SidebarTab link="/" title="Soporte" icon="question_answer" handleSidebar={trigger} />
                </Section>
            </Content>
            <div className="logo">
                <Logo redirect={false}/>
            </div>
        </Aside>
    </AsideContainer>
}

export default Sidebar;