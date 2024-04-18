import styled from "styled-components";
import { Container } from ".";
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
export const SignIUFooter = styled.footer`
    background: ${({theme}) => theme.primarycont};
    color: ${({theme}) => theme.onprimarycont};
    padding: 1rem;
    text-align: center;
    position: sticky;
    bottom: 0;
`;