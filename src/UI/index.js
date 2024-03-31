import styled from "styled-components";

export const Header = styled.header`
    background: ${({theme}) => theme.bg};
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid ${({theme}) => theme.primary};
    color: ${({theme}) => theme.primary};
    transition: all 200ms ease-in;
    z-index: 2;
    position: sticky;
    top: 0;

    & i:hover{
        background: ${({theme}) => theme.primarycont};
        outline-style: solid;
    }

    @media screen and (min-width: 0px) and (max-width: 480px) {
        &{
            padding: 1rem .5rem;
        }
    }
`;
export const NavHeader = styled.nav`
    display: flex;
    align-items: center;
    gap: 1rem;
    @media screen and (min-width: 0px) and (max-width: 480px) {gap: .5rem;}
`;
export const Container = styled.main`
    color: ${({theme}) => theme.onbg};
    background: ${({theme}) => theme.bg};
    min-height: 100%;
`;
export const MainContainer = styled.main`
    min-height: 100vh;
    padding: 2rem;
    color: ${({theme}) => theme.onbg};
    background: ${({theme}) => theme.bg};
    box-sizing: border-box;
    transition: all 200ms ease-in;
    @media screen and (min-width: 0px) and (max-width: 480px) {padding: .5rem;}
`;
export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.1);
    transition: width 200ms ease-in;
    &.show{
        visibility: visible;
    }
    &.hide{
        visibility: hidden;
    }
`;
export const FlexColum = styled.div`
    display: flex;
    flex-direction: column;
`;
export const Banner = styled.section`
    height: auto;
    background: url(${props => props.$url}) center / cover;
    &.light{
        div.info{
            color: ${({theme}) => theme.bg};
            & div.text{
                text-shadow: 2px 2px 3px ${({theme}) => theme.onprimarycont};
            }
        }
    }
    &.dark{
        div.info{
            color: ${({theme}) => theme.onbg};
            & div.text{
                text-shadow: 2px 2px 3px ${({theme}) => theme.primarycont};
            }
        }
    }
    & div.info{
        background: rgba(0, 0, 0, 0.5);
        padding: 2rem 4rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        @media screen and (min-width: 0px) and (max-width: 480px) {
            padding: 1rem;
            flex-direction: column-reverse;
        }

        & div.text{
            width: 50%;
            gap: 2rem;
            @media screen and (min-width: 0px) and (max-width: 480px) {
                width:100%;
                & h1{text-align: center;}
            }
        }
        & div.img{
            width: 30%;
            @media screen and (min-width: 0px) and (max-width: 480px) {width:50%}
            & img{
                width: 100%;
            }
        }
    }
`;
export const SectionBg = styled.section`
    background: ${props => props.$bg};
    color: ${props => props.$txt};
    padding: 0 2rem;
    @media screen and (min-width: 0px) and (max-width: 480px) {padding: 0 1.5rem;}
`;
export const SignIUContainer = styled(Container)`
    @media screen and (min-width: 0px) and (max-width: 480px) {
        header{display:none;}
    }
`;
export const SignIUCard = styled.section`
    display: flex;
    flex-wrap: wrap;
    min-height: 100vh;
`;
export const SignIUCardLeft = styled.div`
    background: url(${props => props.$url}) center / cover;
    flex: 1 1 250px;
    & #backdrop{
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        backdrop-filter: brightness(60%);
        &.light{
            color: ${({theme}) => theme.bg};
            text-shadow: 2px 2px 3px ${({theme}) => theme.onprimarycont};
        }
        &.dark{
            color: ${({theme}) => theme.onbg};
            text-shadow: 2px 2px 3px ${({theme}) => theme.onprimary};
        }
    }
    & a{
        text-decoration: none;
    }
    & .message{
        text-align: center;
        font-weight: 300;
    }
    @media screen and (min-width: 0px) and (max-width: 480px) {
        background: ${({theme}) => theme.bg};
        padding: 1rem 0 0 0;
        & #backdrop{
            backdrop-filter: unset;
            &.light, &.dark{
                text-shadow: none;
            }
        }
        & .message{
            display: none;
        }
    }
`;
export const SignIUCardRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 2.5rem;
    flex: 1 1 250px;
    box-shadow: -8px 0 10px rgba(0, 0, 0, 0.3);
    & form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
    }
    & h1{
        color: ${({theme}) => theme.primary};
        font-weight: 700;
        text-align: center;
    }
    & a{color: ${({theme}) => theme.ontertiarycont};}
    @media screen and (min-width: 0px) and (max-width: 480px) {
        justify-content: flex-start;
        box-shadow: none;
        padding: 1rem;
    }
`;
export const CardContent = styled(SignIUCardRight)`
    max-width: 600px;
    margin: 0 auto;
    box-shadow: none;
    & .enlaces{ display: flex; gap: 1rem;}
    @media screen and (min-width: 0px) and (max-width: 480px) {
        justify-content: center;
    }
`;
export const FormResponse = styled.small`
    font-weight: 700; text-align: center; padding: .5rem; border-radius: .5rem;
    &.error{
        color: ${({theme}) => theme.error};
        background-color: ${({theme}) => theme.errorcont};
    }
    &.response{
        color: ${({theme}) => theme.ok};
        background-color: ${({theme}) => theme.okcont};
    }
`;
export const FormFields = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
export const Field = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    & label{font-weight: 700;padding-bottom: .5rem;}
    & input{margin-bottom: .5rem;};
    &:focus-within label{
        color: ${({theme}) => theme.primary};
        transition: all 200ms ease-in;
    }
    & small{
        color: ${({theme}) => theme.error};
    }
`;
export const FieldInput = styled.input`
    padding: .5rem 1rem;
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    border: 1px solid ${({theme}) => theme.outline};
    border-radius: .25rem;
    background: inherit;
    color: inherit;
    caret-color: ${({theme}) => theme.secondary};
    box-sizing: border-box;
    &:hover{
        background: ${({theme}) => theme.surfacev};
    }
    &:focus{
        border-color: ${({theme}) => theme.secondary};
        outline: 2px solid ${({theme}) => theme.secondarycont};
    }
    &[type="checkbox"]{
        accent-color: ${({theme}) => theme.secondary};
    }
    &:-webkit-autofill{
        -webkit-box-shadow: 0 0 0px 1000px ${({theme}) => theme.bg} inset;
        -webkit-text-fill-color: ${({theme}) => theme.onbg};
    }
    &::placeholder{
        color: ${({theme}) => theme.onsurfv};
    }
    &.error{
        color: ${({theme}) => theme.error};
        border-color: ${({theme}) => theme.error};
        caret-color: ${({theme}) => theme.error};
        &:focus{
            outline: 2px solid ${({theme}) => theme.errorcont};
        }
        &::placeholder{color: ${({theme}) => theme.error};}
    }
`;
export const SignIUFooter = styled.footer`
    background: ${({theme}) => theme.primarycont};
    color: ${({theme}) => theme.onprimarycont};
    padding: 1rem;
    text-align: center;
    position: sticky;
    bottom: 0;
`;
export const InputColum = styled.section`
    display: flex;
    box-sizing: border-box;
    gap: 1rem;
    & div{
        flex: 1 1 100px;
        & input{width: 100%}
    }
`;
export const BaseBtn = styled.button`
    padding: 1rem;
    border-radius: .25rem;
    background: ${({theme}) => theme.surfacev};
    transition: all 300ms linear;
    &:hover{
        outline-width: 1px;
        outline-style: solid;
    }
    @media screen and (min-width: 0px) and (max-width: 480px) {padding: .5rem 1rem;}
    &.primary{
        background: ${({theme}) => theme.primary};
        color: ${({theme}) => theme.onprimary};
        &:hover{
            outline-color: ${({theme}) => theme.primary};
            color: ${({theme}) => theme.onprimarycont};
            background: ${({theme}) => theme.primarycont};
        }
        &.oncont{
            background: ${({theme}) => theme.onprimarycont};
            color: ${({theme}) => theme.onprimary};
            &:hover{
                outline-color: ${({theme}) => theme.onprimarycont};
                color: ${({theme}) => theme.onprimarycont};
                background: ${({theme}) => theme.onprimary};
            }
        }
    }
    &.secondary{
        background: ${({theme}) => theme.secondary};
        color: ${({theme}) => theme.onsecondary};
        &:hover{
            outline-color: ${({theme}) => theme.secondary};
            color: ${({theme}) => theme.onsecondarycont};
            background: ${({theme}) => theme.secondarycont};
        }
    }
    
    &.icon{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        font-weight: 700;
        & i{pointer-events: none;}
        &.inverted{
            flex-direction: row-reverse;
        }
    }
    &.only-icon{
        padding: .25rem;
        font-size: 0px;
        width: min-content;
    }

    &:disabled{
        background: ${({theme}) => theme.outline};
        color: ${({theme}) => theme.surfacev};
        cursor: not-allowed;
        &:hover{
            background: ${({theme}) => theme.outline};
            color: ${({theme}) => theme.surfacev};
            outline: none;
        }
    }
    &:disabled i{
        cursor: inherit;
    }
`;
export const PageTitle = styled.h2`
    color: ${({theme}) => theme.primary};
    font-weight: 700;
    padding-bottom: .25rem;
    border-bottom: 2px solid ${({theme}) => theme.primary};
    margin-bottom: 1rem;
`;
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
    flex: 0 1 350px;
    background-color: ${({theme}) => theme.surfacev};
    padding: 1rem;
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
    & .features li{
        text-align: left;
        margin-bottom: .5rem;
        &::first-letter{text-transform: uppercase;}
        &::after{content:"."}
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
export const Instalations = styled.section`
    &> section{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: .5rem;
    }
    &> ul{
        padding: 1rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
`;
export const Instalation = styled.li`
    background: ${({theme}) => theme.secondarycont};
    color: ${({theme}) => theme.onsecondarycont};
    display: flex;
    flex: 1 1 250px;
    justify-content: space-between;
    align-items: center;
    border-radius: .5rem;
    padding: 1rem;
    gap: .5rem;
    position: relative;
    &.inactive{
        background: ${({theme}) => theme.outline};
        color: ${({theme}) => theme.surfacev};
    }
    & section{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        & h4{font-weight: 700;}
        & a{
            text-decoration: none;
        }
    }
    & .context{
        & button{
            align-self: flex-end;
            padding: 0;
        }
    }
    & .instalation-icon{
        font-size: 5rem;
        cursor: default;
    }
    &.skeleton{
        gap: 1rem;
        & div{
            flex-grow: 1;
            & h4, p { background: ${({theme}) => theme.onsecondarycont}; width: 100%; height: 1.5rem; margin-bottom: .5rem}
            & p{width: 80%;}
        }
        & i{
            width: 3.5rem;
            height: 3.5rem;
            background: ${({theme}) => theme.onsecondarycont};
        }
    }
`;
