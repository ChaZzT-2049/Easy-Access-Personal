import styled from "styled-components";
import Icon from "../Icon/Index"

import Logo from "../Logo/Index";
import { Header } from "../../UI";

const Info = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    @media screen and (min-width: 0px) and (max-width: 480px) {
        &{
            gap: .5rem;
        }
    }
`;

const Topbar = ({handleSidebar, handleOptions}) => {
    return <Header>
        <Info>
            <Icon onClick={handleSidebar} icon="menu"/>
            <Logo />
        </Info>
        <Icon onClick={handleOptions} icon="more_vert"/>
    </Header>
}

export default Topbar;