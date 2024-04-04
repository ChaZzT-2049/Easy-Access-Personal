import Modal from "../../../components/Modal/Index"
import Input from "../../../components/Form/Input"
import Select from "../../../components/Form/Select"
const InstalationEdit = ({controls, clean, name, icon, city, action, doc}) => {
    return <>
        <Modal confirm="Editar" clean={clean} controls={controls} title="Editar Instalación."
        modalFunction={()=>{
            name.validate(name.value)
            icon.validate(icon.selected.value)
            city.validate(city.value)
            if(name.valid && city.valid && icon.valid){
                action(doc.id, {name: name.value, city: city.value, icon: icon.selected.value})
                controls.trigger()
                clean()
            }
        }}>
            <Input {...name} 
            label="Nombre" id="own-name-edit" placeholder="Escribe el nombre de tu Instalación." /><br />
            <Input {...city} 
            label="Ciudad" id="own-city-edit" placeholder="Escribe la Ciudad de tu Instalación." />
            <br />
            <Select {...icon} label="Icono" placeholder="Selecciona un Icono" id="own-icon-edit" />
        </Modal>
    </>
}
export default InstalationEdit