import useAppContext from "../../hooks/useAppContext"
import useDialog from "../../hooks/useDialog"
import useInput from "../../hooks/useInput"
import useSelect from "../../hooks/useSelect"
import { validateNameApellidos } from "../../validations"
import Btn from "../Button/Index"
import Modal from "../Modal/Index"
import Input from "../Form/Input"
import Select from "../Form/Select"
import { icons } from "./icons"
const InstalationAdd = ({action}) => {
    const {user} = useAppContext()
    const create = useDialog()
    const name = useInput("text", validateNameApellidos)
    const city = useInput("text", validateNameApellidos)
    const icon = useSelect(icons)
    const cleanInputs = () => {
        name.clean()
        city.clean()
        icon.clean()
    }
    return <>
        <Btn onClick={create.trigger} type="icon" colors="primary" action="Crear" icon="add_box" />
        
        <Modal confirm="Crear" clean={cleanInputs} controls={create} title="Crear Instalación"
        modalFunction={()=>{
            name.validate(name.value)
            city.validate(city.value)
            icon.validate(icon.selected.value)
            if(name.valid && city.valid && icon.valid){
                action({name: name.value, city: city.value, icon: icon.selected.value, user: user.uid})
                create.trigger()
                cleanInputs()
            }
        }}>
            <Input {...name} 
            label="Nombre" id="name" placeholder="Escribe el nombre de tu Instalación." /><br />
            <Input {...city} 
            label="Ciudad" id="city" placeholder="Escribe la Ciudad de tu Instalación." /><br />
            <Select {...icon} label="Icono" placeholder="Selecciona un Icono" name="icon" id="icon" />
        </Modal>
    </>
}
export default InstalationAdd