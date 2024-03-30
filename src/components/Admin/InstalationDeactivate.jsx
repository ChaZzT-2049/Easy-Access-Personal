import Modal from "../Modal/Index"
import Input from "../Form/Input"
import useInput from "../../hooks/useInput"
import { validateNameApellidos } from "../../validations"
const InstalationDeactivate = ({controls, doc, action}) => {
    const name = useInput("text", validateNameApellidos)
    const active = doc.active === false ? "Activar" : "Desactivar"
    return <>
        <Modal confirm={active} controls={controls} title={`${active} ${doc.name}`} type="danger"
        modalFunction={()=>{
            name.validate(name.value)
            if(name.valid){
                action(doc.id, {...doc, active: !doc.active})
                controls.trigger()
            }
            name.clean()
        }}>
            {doc.active !== false && <p>
                <b>Advertencia:</b> <small>
                    Desactivar la instalación provocara que no se generen nuevos registros, sin embargo
                    los datos previos estarán disponibles.
                </small>
            </p>}
            <Input {...name} 
            label="Confimar Acción" id="name-deactivate" placeholder="Escribe el nombre de tu Instalación." /><br />
        </Modal>
    </>
}
export default InstalationDeactivate