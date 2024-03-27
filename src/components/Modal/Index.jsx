import styled from "styled-components"
import Btn from "../Button/Index"
import Icon from "../Icon/Index";
const ModalStyled = styled.dialog`
    width: 100%;
    max-width: 600px;
    background: ${({theme}) => theme.bg};
    color: ${({theme}) => theme.onbg};
    border: none;
    border-radius: .5rem;
    padding: 0;
    &::backdrop{
        background: #00000065;
    }
    transition: all 300ms ease-in-out;

    &[open]{
        opacity: 1;
        transform: translateY(0);
    }
    &[close]{
        opacity: 0;
        transform: translateY(-10rem);
    }
    & h2{
        background: ${({theme}) => theme.primary};
        padding: 1rem;
        color: ${({theme}) => theme.onprimary};
        display: flex;
        align-items: center;
        justify-content: space-between;
        & i{outline: 1px solid ${({theme}) => theme.onprimary};}
    }
    & section{
        padding: 1rem;
    }
    & div.actions{
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        flex-wrap: wrap;
        padding: 1rem;
        border-top: 2px solid ${({theme}) => theme.outline};
    }
`;

const Modal = ({controls, children, modalFunction, confirm, title}) => {
    const {closeOutside, trigger, ref} = controls
    return <ModalStyled onClick={(e) =>{closeOutside(e)}} ref={ref}>
        <h2>{title} <Icon onClick={trigger} icon="close"/></h2>
        <section>
            {children}
        </section>
        <div className="actions">
            <Btn action="Cancelar" colors="primary" onClick={trigger} />
            <Btn action={confirm} colors="primary oncont" onClick={modalFunction} />
        </div>
    </ModalStyled>
}
export default Modal