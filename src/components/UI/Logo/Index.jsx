import styled from "styled-components";
import logo from "../../../assets/img/logo.png"
import { Link } from "react-router-dom";

const SLogo = styled.div`
    display: flex;
    align-items: center;
    gap: .25rem;
    color: ${({theme}) => theme.primary};
    text-decoration: none;
    &.default{
        & img{width: 1.5rem;}
        & h2{line-height: normal;}
        @media screen and (min-width: 0px) and (max-width: 480px) {
            & h2{
                font-size: 1.17rem;
            }
        }
    }
    &.slogan {
        flex-direction: column;
        justify-content: center;
        text-align: center;
        & img{width: 25%;}
        & small{
            color: ${({theme}) => theme.outline};
            font-weight: 700;
        }
    }
`;
const Logo = ({slogan, redirect = true}) =>{
    const LogoContent = () => {
        return <SLogo className={slogan ? "slogan" : "default"}>
            <img loading="lazy" src={logo} alt="Logo" />
            <h2>Aditum <b>Delta</b></h2>
            {slogan && <small>Acceso Seguro, Acceso Facil.</small>}
        </SLogo>
    }
    if(redirect){ 
        return <Link to="/welcome" style={{textDecoration: 'none'}}>
            <LogoContent />
        </Link>
    }
    return <LogoContent />
}

export default Logo;
