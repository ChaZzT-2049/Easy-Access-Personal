import { useRef } from "react"
import styled from "styled-components"

const ContextMenu = styled.dialog`
    inset: unset;
    background: ${({theme}) => theme.surfacev};
    border-radius: .5rem;
    position: absolute;
    width: 200px;
    height: max-content;
    top: 1rem;
    right: 1rem;
    box-sizing: border-box;
    margin: auto;
    border: none;
    padding: 0;
    z-index: 1;
    box-shadow: -8px 8px 15px #0000004e;
    & button{
        padding: 1rem;
        width: 100%;
        text-align: left;
        color: ${({theme}) => theme.onsurfv};
    }
    & hr{
        border-top: 2px solid ${({theme}) => theme.outline};
        margin: 0;
    }
    animation: scale-in 250ms ease forwards;
    @keyframes scale-in {
        from{scale: .5;} to{scale: 1;}
    }

`
const Menu = ({children, cleanRef}) => {
    const menuRef = useRef(null)
    const closeContext = () =>{
        menuRef.current.close()
    }
    return <ContextMenu ref={menuRef} open={true} onClick={cleanRef}>
        {children}
        <button onClick={closeContext}>Cancelar</button>
    </ContextMenu>
}
export default Menu