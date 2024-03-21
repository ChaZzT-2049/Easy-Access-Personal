import Btn from "../Button/Index"

const Modal = ({controls, children}) => {
    const {closeOutside, trigger, ref} = controls
    return <dialog onClick={(e) =>{closeOutside(e)}} ref={ref}>
        <section>
            {children}
        </section>
        <div><Btn action="Cancelar" colors="primary" onClick={trigger} /></div>
    </dialog>
}
export default Modal