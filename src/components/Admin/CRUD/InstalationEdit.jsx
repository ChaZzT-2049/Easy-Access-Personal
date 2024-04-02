import Modal from "../../Modal/Index"
import Input from "../../Form/Input"
import Select from "../../Form/Select"
const InstalationEdit = ({controls, clean, name, icon, city, action, doc, baseID = "own"}) => {
    return <>
        <Modal confirm="Editar" clean={clean} controls={controls} title="Editar Instalación."
        modalFunction={()=>{
            name.validate(name.value)
            icon.validate(icon.selected.value)
            if(city){
                city.validate(city.value)
                if(name.valid && city.valid && icon.valid){
                    action(doc.id, {name: name.value, city: city.value, icon: icon.selected.value})
                    controls.trigger()
                    clean()
                }
            }else{
                if(name.valid && icon.valid){
                    action(doc.id, {name: name.value, icon: icon.selected.value})
                    controls.trigger()
                    clean()
                }
            }
            
        }}>
            <Input {...name} 
            label="Nombre" id={`${baseID}-name-edit`} placeholder="Escribe el nombre de tu Instalación." /><br />
            {city && <Input {...city} 
            label="Ciudad" id={`${baseID}-city-edit`} placeholder="Escribe la Ciudad de tu Instalación." />}
            <br />
            <Select {...icon} label="Icono" placeholder="Selecciona un Icono" id={`${baseID}-icon-edit`} />
        </Modal>
    </>
}
export default InstalationEdit