import styled from "styled-components"
import Btn from "../UI/Button/Index"
import Icon from "../UI/Icon/Index";
const ModalStyled = styled.dialog`
    width: 95%;
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
    &.danger h2{
        background: ${({theme}) => theme.error};
        color: ${({theme}) => theme.onerror};
    }
    & section{
        padding: 1rem;
        &> p{
            padding: .5rem;
            border-radius: .5rem;
            margin-bottom: .5rem;
            background: ${({theme}) => theme.errorcont};
            color: ${({theme}) => theme.onerrorcont};
        }
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

const Modal = ({controls, children, modalFunction, confirm, title, clean, type}) => {
    const {closeOutside, trigger, ref} = controls
    return <ModalStyled className={type || ""} onClick={(e) =>{closeOutside(e);}} ref={ref}>
        <h2>{title} <Icon onClick={()=>{
            trigger()
            if(clean){
                clean()
            }
        }} icon="close"/></h2>
        <section>
            {children}
        </section>
        <div className="actions">
            <Btn action="Cancelar" colors="primary" onClick={() => {
                trigger()
                if(clean){
                    clean()
                }
            }} />
            <Btn action={confirm} colors="primary oncont" onClick={modalFunction} />
        </div>
    </ModalStyled>
}
export default Modal