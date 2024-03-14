import { useNavigate } from "react-router-dom";
import { Header, MainContainer, SignIUFooter } from "../UI";
import Logo from "../components/Logo/Index";
import styled from "styled-components";
import Btn from "../components/Button/Index";

const Message = styled.section`
    background-color: ${({theme}) => theme.errorcont};
    color: ${({theme}) => theme.onerrorcont};
    padding: 2rem;
    border-radius: .5rem;

    max-width: 600px;
    margin: 0 auto;

    & div{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1rem;

        & span {
            font-size: 5rem;
        }
    }
    & p { margin-bottom: 1rem;}
`;

const NotFound = () => {
    const navigate = useNavigate()
    return <>
        <Header>
            <Logo/>
        </Header>
        <MainContainer>
            <Message>
                <div>
                    <h1>Error 404</h1> <span className="material-icons">sentiment_very_dissatisfied</span>
                </div>
                <p>Parece que la pagina que estas buscando no existe, lo sentimos.</p>
                <Btn action="Volver" colors="primary" type="icon" icon="history" click={()=>{
                    navigate(-1)
                }}/>
            </Message>
        </MainContainer>
        <SignIUFooter><h4>Aditum Delta. © Derechos Reservados 2024</h4></SignIUFooter>
    </>
}
export default NotFound;