import styled from "styled-components";

import Logo from "../Logo/Index";
import { Header } from "../../../styled/index";
import Btn from "../Button/Index";

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
            <Btn onClick={handleSidebar} type="only-icon" colors="primary cont" icon="menu"/>
            <Logo />
        </Info>
        <Btn onClick={handleOptions} type="only-icon" colors="primary cont" icon="more_vert"/>
    </Header>
}

export default Topbar;