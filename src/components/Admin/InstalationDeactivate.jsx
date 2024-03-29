import Modal from "../Modal/Index"
import Input from "../Form/Input"
import useInput from "../../hooks/useInput"
import { validateNameApellidos } from "../../validations"
const InstalationDeactivate = ({controls, doc, action}) => {
    const name = useInput("text", validateNameApellidos)
    const active = doc.active === false ? "Activar" : "Desactivar"
    return <>
        <Modal confirm={active} controls={controls} title={`${active} ${doc.name}`}
        modalFunction={()=>{
            name.validate(name.value)
            if(name.valid){
                action(doc.id, {...doc, active: !doc.active})
                controls.trigger()
            }
            name.clean()
        }}>
            {doc.active === false && <small>
                Advertencia: Desactivar la instalación provocara que no se generen nuevos registros, 
                los datos previos estaran disponibles.
            </small>}
            <Input {...name} 
            label="Confimar Acción" id="name-edit" placeholder="Escribe el nombre de tu Instalación." /><br />
        </Modal>
    </>
}
export default InstalationDeactivate