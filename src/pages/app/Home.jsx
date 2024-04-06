import useAppContext from "../../hooks/app/useAppContext"
import styled from "styled-components"
import Inscriptions from "../../features/User/Inscriptions";
import { PageTitle } from "../../styled";
const UserWelcome = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    margin-bottom: .5rem;
    flex-wrap: wrap;
    & img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }
    & h2{
        text-align: center;
        font-weight: 300;
    }
`;
const Home = () => {
    const {user} = useAppContext()
    return <>
        <UserWelcome>
            <img src={user.photoURL} alt="profile" referrerPolicy="no-referrer" />
            <h2><b>Bienvenido, </b>{user.displayName || "Usuario"}</h2>
        </UserWelcome>
        <PageTitle>Instalaciones</PageTitle>
        <Inscriptions/>
    </>
}
export default Home;