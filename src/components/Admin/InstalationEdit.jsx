import useAppContext from "../../hooks/useAppContext"
import Modal from "../Modal/Index"
import Input from "../Form/Input"
import Select from "../Form/Select"
const InstalationEdit = ({controls, clean, name, icon, city, action, doc}) => {
    const {user} = useAppContext()
    return <>
        <Modal confirm="Editar" clean={clean} controls={controls} title="Editar Instalación."
        modalFunction={()=>{
            name.validate(name.value)
            city.validate(city.value)
            icon.validate(icon.selected.value)
            if(name.valid && city.valid && icon.valid){
                action(doc, {name: name.value, city: city.value, icon: icon.selected.value, user: user.uid})
                controls.trigger()
                clean()
            }
        }}>
            <Input {...name} 
            label="Nombre" id="name-edit" placeholder="Escribe el nombre de tu Instalación." /><br />
            <Input {...city} 
            label="Ciudad" id="city-edit" placeholder="Escribe la Ciudad de tu Instalación." /><br />
            <Select {...icon} label="Icono" placeholder="Selecciona un Icono" id="icon-edit" />
        </Modal>
    </>
}
export default InstalationEdit