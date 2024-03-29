import styled from "styled-components";
import Icon from "../Icon/Index";
import useAppContext from "../../hooks/useAppContext";

const Menu = styled.dialog`
    padding: 0;
    margin: .5rem 0;
    position: fixed;
    top: -50vh;
    opacity: 0;
    outline: none;
    background: ${({theme}) => theme.surfacev};
    width: max-content;
    border: 2px solid ${({theme}) => theme.outline};
    border-radius: .5rem;
    transition: all 300ms ease-in-out;

    inset: unset;
    right: 1.5rem;

    &[open]{
        top: 0;
        opacity: 1;
        transition: all 300ms ease-in-out;
    }

    @starting-style {
        &[open] {
            opacity: 0;
            top: -50vh;
            transition: all 300ms ease-in-out;
        }
    }
    &::backdrop{
        background: #00000000;
        transition: all 300ms ease-in-out;
        cursor: pointer;
    }
    &[open]::backdrop{
        background: #00000026;
        transition: all 300ms ease-in-out;
    }
    @starting-style {
        &[open]::backdrop{
            background: #00000000;
            transition: all 300ms ease-in-out;
        }
    }

    @media screen and (min-width: 0px) and (max-width: 480px) {
        right: .5rem;
    }

    & div{
        background: ${({theme}) => theme.primary};
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        color: ${({theme}) => theme.onprimary};
        padding: .5rem;
        border-radius: .4rem .4rem 0 0;

        & i:hover{
            background: ${({theme}) => theme.onprimarycont};
            outline: 1px solid ${({theme}) => theme.onprimary};
        }
    }
    & ul{
        color: ${({theme}) => theme.onsurfv};

        & li{
            padding: .5rem 1rem;
            display: flex;
            align-items: center;
            gap: .5rem;
            border-bottom: 2px solid ${({theme}) => theme.outline};

            &:last-child{
                border: none;
            }
            & i:hover{
                background: ${({theme}) => theme.bg};
                outline: 1px solid ${({theme}) => theme.onsurfv};
            }
            @media screen and (min-width: 0px) and (max-width: 480px) {padding: .5rem;}
        }
    }
`;

const Options = ({controls}) =>{
    const {closeOutside, trigger, ref} = controls
    const {tema, toggleTheme} = useAppContext()

    return <Menu onClick={(e) =>{closeOutside(e)}} ref={ref}>
        <div>
            <h3>Options</h3>
            <Icon onClick={()=>{trigger()}} icon="close"/>
        </div>
        <ul>
            <li>Item</li>
            <li>Item</li>
            <li>Tema: {tema ? "Light" : "Dark"} 
                <Icon onClick={toggleTheme} icon={tema ? "light_mode" : "dark_mode"}/>
            </li>
        </ul>
    </Menu>
}

export default Options