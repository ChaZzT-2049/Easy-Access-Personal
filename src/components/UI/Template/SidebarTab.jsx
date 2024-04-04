import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Icon from "../Icon/Index";

const NavTab = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({theme}) => theme.primary};
    text-decoration: none;
    border-radius: .5rem;
    padding-left: 0;
    padding-right: .125rem;
    transition: all 300ms ease-in;
    cursor: pointer;

    &:hover, &:focus{
        background: ${({theme}) => theme.primarycont};
        padding-left: .5rem;
        outline: 2px solid ${({theme}) => theme.primary};
    }
    &.active{
        padding-left: .5rem;
        background: ${({theme}) => theme.onprimarycont};
        color: ${({theme}) => theme.primarycont};
    }
`;
const SidebarTab = ({link, handleSidebar, title, icon}) => {
    return <NavTab to={link} onClick={()=>{handleSidebar()}} > 
        {title}
        <Icon icon={icon} />
    </NavTab>
}
export default SidebarTab