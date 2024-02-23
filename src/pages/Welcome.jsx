import styled, { useTheme } from "styled-components";
import { Header, NavHeader, Banner, SectionBg, Container } from "../UI";
import Logo from "../components/Logo/Index";
import LogoSlogan from "../components/Logo/LogoSlogan";
import qrScan from "../assets/img/landing/qrscan-anim-min.png"
import banner from "../assets/img/landing/places-cover-min.png"
import logo from "../assets/img/logo.png"
import Icon from "../components/Icon/Index";
import Btn from "../components/Button/Index";
import Slider from "../components/Slider/Index";

import { clients, features, planes } from "../datoswelcome";
import { Link, useNavigate } from "react-router-dom";

import useToggle from "../hooks/useToggle";
import useAppContext from "../hooks/useAppContext";

const PageContainer = styled(Container)`
    & .center{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column-reverse;
        padding: 2.5rem 0;
    }
    & .flex-column{
        display: flex;
        flex-direction: column;
    }
    & .description{
        width: 60%;
        text-align: center;
        gap: .5rem;
    }
    @media screen and (min-width: 0px) and (max-width: 480px) {
        & .center{ padding: 1rem; flex-direction: column; }
        & .description{ width: 100%; }
    }
`;

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;

    & li.clientes{
        flex: 0 1 270px;
        border: 1px solid ${({theme}) => theme.outline};
        border-radius: 1rem;
        transition: all 300ms ease;
        background: ${({theme}) => theme.surfacev};
        color: ${({theme}) => theme.onsecondarycont};
        & .head{
            height: 10rem;
            position: relative;
            & img.cover{
                border-radius: 1rem 1rem 0 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            & img.icon{
                width: 4rem;
                position: absolute;
                bottom: -1rem;
                right: -1rem;
                background: white;
                border-radius: 100%;
            }
        }
        & div.text{
            padding: 1rem;
            gap: .5rem;
        }

        &:hover{
            background: ${({theme}) => theme.secondarycont};
            transform: translateY(-.5rem);
        }
    }
`;

const SelectorSuscription = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem 0;

    position: sticky;
    top: 4rem;
    z-index: 1;
    background: ${({theme}) => theme.bg};
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
    @media screen and (min-width: 0px) and (max-width: 480px) {top: 3.7rem;}
`;
const Planes = styled(List)`
    gap: 1rem;
    padding: 2rem 0;
    & .plan{
        flex: 0 1 280px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        padding: 3rem 1rem 1rem 1rem;
        background: ${({theme}) => theme.surfacev};
        position: relative;
        & h2{
            text-align: center;
            text-transform: uppercase;
            font-weight: 700;
            background: ${({theme}) => theme.secondary};
            color: ${({theme}) => theme.onsecondary};
            position: absolute;
            top: 0;
            left: 0;
            padding: 1rem;
            width: 100%;
            box-sizing: border-box;
        }
        & h1{
            margin-top: 1.5rem;
            text-align: center;
            &::before{
                content: "$";
            }
            & small::before{
                content: ".00 ";
            }
        }
        & span.message{
            font-size: 1rem;
            display: flex;
            justify-content: center;
            opacity: 0;
            transition: opacity 200ms ease;
            color: ${({theme}) => theme.primary};
            &.visible{
                opacity: 1;
                font-weight: 700;
            }
        }
        & img{
            width: 5rem;
            align-self: center;
            height: 5rem;
            border-radius: .5rem;
            outline: 2px solid ${({theme}) => theme.secondary};
        }
        & ul{
            display: flex;
            flex-direction: column;
            & li{
                border-top: 1px solid ${({theme}) => theme.outline};
                padding: 1rem 0;
                display: flex;
                align-items: center;
                & i{
                    margin-right: .25rem;
                    color: ${({theme}) => theme.ok};
                    font-weight: 700;
                    cursor: default;
                }
                & span::first-letter{
                    text-transform: uppercase;
                }
                & span::after{
                    content: ".";
                }
            }
        }
    }
`;

const Footer = styled.footer`
    &.light{
        background: ${({theme}) => theme.onprimarycont};
        color: ${({theme}) => theme.onprimary};
        & section.content div h3{
            color: ${({theme}) => theme.primarycont};
        }
    }
    &.dark{
        background: ${({theme}) => theme.onprimary};
        color: ${({theme}) => theme.onprimarycont};
        & section.content div h3{
            color: ${({theme}) => theme.primary};
        }
    }
    padding: 2rem;
    & section.head{
        display: flex;
        gap: .5rem;
        align-items: center;
        margin-bottom: 1rem;
        & img{width: 4rem;}
        @media screen and (min-width: 0px) and (max-width: 480px) {
            flex-direction: column;
            text-align: center;
        }
    }
    & section.content{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        & div{
            display: flex;
            flex: 1 1 200px;
            flex-direction: column;
            gap: 1rem;
            & h3{
                font-weight: 700;
                text-align: center;
            }
            & li{
                display: flex;
                transition: all 200ms ease-in;
                & a, & span{
                    color: inherit;
                    text-decoration: none;
                    width: 100%;
                    padding: .5rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                &:hover{
                    color: ${({theme}) => theme.tertiarycont};
                    background:  ${({theme}) => theme.primary};
                    font-weight: 700;
                }
            }
        }
        @media screen and (min-width: 0px) and (max-width: 480px) {justify-content: flex-start;}
    }
`;
const Welcome = () => {
    const navigate = useNavigate()
    const colors = useTheme()
    const {toggle, trigger} = useToggle()
    const {auth, tema, toggleTheme} = useAppContext()
    return <>
        <Header>
            <Logo/>
            <NavHeader>
                {auth === false ? <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </> : <Link to="/home">Home</Link>
                }
                <Icon onClick={()=>{toggleTheme()}} icon={tema ? "light_mode" : "dark_mode"} />
            </NavHeader>
        </Header>
        <PageContainer>
            <Banner className={tema ? "light" : "dark"} url={banner}>
                <div className="info">
                    <div className="text flex-column">
                        <h1><b>Accede a tus lugares importantes con solo mostrar un código QR</b></h1>
                        <h3>¡Se acabaron las demoras! no más listas, no más registros. Con Easy Access el acceso es facil y seguro.</h3>
                        <div>
                            <Btn click={() => {navigate("/register")}} colors="primary" action="Comenzar" />
                        </div>
                    </div>
                    <div className="img">
                        <img src={qrScan} alt="qr code" />
                    </div>
                </div>
            </Banner>
            <section className="center">
                <div className="flex-column description">
                    <h1>Administra tus accesos con nosotros.</h1>
                    <p>Easy Access es un sistema de gestión y control de acceso mediante el registro de codigo QR. Desarrollado por estudiantes de la UT Riviera Maya para facilitar el acceso a diversas instalaciones, manteniento la seguridad y brindando herramientas para saber quien entra y sale en todo momento.</p>
                </div>
                <LogoSlogan />
            </section>
            <SectionBg bg={colors.secondary} txt={colors.onsecondary}>
                <section className="center">
                    <div className="flex-column description">
                        <h1>Diferentes casos, una solución.</h1>
                        <p>Nos ajustamos a las necesidades de cada cliente, no necesitas pagar por un sistema caro y complejo, nosotros tenemos la solucion definitiva. Administra usuarios, puntos de acceso, encargados para tu instalación y muchos beneficios más.</p>
                    </div>
                </section>
                <List>
                    {clients.map(client => 
                        <li className="clientes" key={client.id}>
                            <div className="head">
                                <img className="cover" src={client.cover} alt="" />
                                <img className="icon" src={client.icon} alt="" />
                            </div>
                            <div className="text flex-column">
                                <h3><b>{client.titulo}</b></h3>
                                <span>{client.descripcion}</span>
                            </div>
                        </li>
                    )}
                </List>
                <section className="center">
                    <div className="description">
                        <h3>Y muchos otros lugares.</h3>
                    </div>
                </section>
            </SectionBg>
            <section>
                <section className="center">
                    <div className="flex-column description">
                        <h1>¡Registrate Ya!</h1>
                        <p>Crea ahora una cuenta en Easy Access y disfruta de las siguientes caracteristicas que ofrece nuestra aplicación.</p>
                    </div>
                </section>
                <Slider datos={features}/>
            </section>
            <section>
                <section className="center">
                    <div className="flex-column description">
                        <h1>Gestiona tus instalaciones con Easy Access hoy mismo.</h1>
                        <span>Contrata uno de nuestros planes que más se ajusten a tus necesidades.</span>
                    </div>
                </section>
                <SelectorSuscription>
                    <li className={!toggle ? "selected" : ""} onClick={() => {trigger()}}>Mensual</li>
                    <li className={toggle ? "selected" : ""} onClick={() => {trigger()}}>Anual</li>
                </SelectorSuscription>
                <Planes>
                    {planes.map(plan => 
                        <li className="plan" key={plan.id}>
                            <h2>{plan.titulo}</h2>
                            <div>
                                <h1>{toggle ? plan.anual : plan.mensual}<small>{plan.moneda}</small></h1>
                                <span className={`message ${toggle && plan.anual > 0 && "visible"}`}>Ahorra un 15%</span>
                            </div>
                            <img src={plan.img} alt="suscripcion icon" />
                            <ul>
                                {plan.features.map((feature, i) =>
                                    <li key={plan.id + i}><Icon icon="check" /><span>{feature.feature}</span></li>
                                )}
                            </ul>
                            <Btn click={() => {navigate("/register")}} colors="primary" type="icon" icon={plan.icon} action={plan.action} />
                        </li>
                    )}
                </Planes>
            </section>
        </PageContainer>
        <Footer className={tema ? "light" : "dark"}>
            <section className="head">
                <img src={logo} alt="" />
                <h3><b>Easy-Access. © Derechos Reservados 2023</b></h3>
            </section>
            <section className="content">
                <div>
                    <h3>Soporte</h3>
                    <ul>
                        <li><span>Llamanos al 984-231-84-39</span></li>
                        <li><a href="mailto:oficialcorp.easyaccess@gmail.com">Contactanos por Correo</a></li>
                        <li><a href="/">Preguntas Frecuentes</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Siguenos</h3>
                    <ul>
                        <li><a href="/">Facebook</a></li>
                        <li><a href="/">Youtube</a></li>
                        <li><a href="/">Instagram</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Información</h3>
                    <ul>
                        <li><a href="/">Terminos y Condiciones</a></li>
                        <li><a href="/">Aviso de Privacidad</a></li>
                        <li><a href="/">Mapa de Sitio</a></li>
                    </ul>
                </div>
            </section>
        </Footer>
    </>
}
export default Welcome;