import styled from "styled-components";
import Icon from "../Icon/Index"
export const BaseBtn = styled.button`
    padding: 1rem;
    border-radius: .25rem;
    background: ${({theme}) => theme.surfacev};
    transition: all 300ms linear;
    &:hover{
        outline-width: 1px;
        outline-style: solid;
    }
    @media screen and (min-width: 0px) and (max-width: 480px) {padding: .5rem;}
    &.primary{
        background: ${({theme}) => theme.primary};
        color: ${({theme}) => theme.onprimary};
        &:hover, &:focus{
            outline-color: ${({theme}) => theme.primary};
            color: ${({theme}) => theme.onprimarycont};
            background: ${({theme}) => theme.primarycont};
        }
        &.cont{
            background: ${({theme}) => theme.primarycont};
            color: ${({theme}) => theme.onprimarycont};
            &:hover, &:focus{
                outline-color: ${({theme}) => theme.onprimarycont};
                color: ${({theme}) => theme.onprimary};
                background: ${({theme}) => theme.onprimarycont};
            }
        }
        &.oncont{
            background: ${({theme}) => theme.onprimarycont};
            color: ${({theme}) => theme.onprimary};
            &:hover{
                outline-color: ${({theme}) => theme.onprimarycont};
                color: ${({theme}) => theme.onprimarycont};
                background: transparent;
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
        padding: 0rem;
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
const Btn = ({action,colors, type, icon, onClick, disabled, id, popovertarget}) => {
    return <BaseBtn id={id} disabled={disabled} popovertarget={popovertarget}
    onClick={onClick} className={`${colors} ${type}`}>{action} {icon && <Icon icon={icon}/>}</BaseBtn>
}
export default Btn