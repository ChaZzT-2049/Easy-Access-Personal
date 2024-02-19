import { Header, MainContainer, SignIUFooter } from "../UI";
import Logo from "../components/Logo/Index";

const NotFound = () => {
    return <>
        <Header>
            <Logo/>
        </Header>
        <MainContainer>
            <h1>Error 404</h1>
        </MainContainer>
        <SignIUFooter><h4>Easy-Access. © Derechos Reservados 2023</h4></SignIUFooter>
    </>
}
export default NotFound;