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
    background: url(${props => props.url}) center / cover;
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
    background: ${props => props.bg};
    color: ${props => props.txt};
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
    background: url(${props => props.url}) center / cover;
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
    gap: 1rem;
    & label{font-weight: 700;}
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