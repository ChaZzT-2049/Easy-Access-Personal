import Modal from "../Modal/Index"
import Input from "../Form/Input"
import useInput from "../../hooks/useInput"
import { validateInstalation } from "../../validations"
import { isActive } from "../../helpers/isActive"
const InstalationDeactivate = ({controls, doc, action}) => {
    const name = useInput("text", validateInstalation)
    const active = isActive(doc.active, "Activar", "Desactivar", true)
    return <>
        <Modal confirm={active} clean={name.clean} controls={controls} title={`${active} ${doc.name}`} type={isActive(doc.active, "danger", "")}
        modalFunction={()=>{
            name.validate(name.value, doc.name)
            if(name.valid){
                action(doc.id, {active: !doc.active})
                controls.trigger()
                name.clean()
            }
        }}>
            {doc.active !== false && <p>
                <b>Advertencia:</b> <small>
                    Desactivar la instalación provocara que no se generen nuevos registros, sin embargo
                    los datos previos estarán disponibles.
                </small>
            </p>}
            <Input {...name} confirm={doc.name} 
            label="Confimar Acción" id="name-deactivate" placeholder="Escribe el nombre de tu Instalación." /><br />
        </Modal>
    </>
}
export default InstalationDeactivate