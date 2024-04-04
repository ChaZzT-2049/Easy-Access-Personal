import Modal from "../../../components/Modal/Index"
import Input from "../../../components/Form/Input"
import InputCheck from "../../../components/Form/InputCheck"
const EditUser = ({user, modal, inputs, action}) => {
    return <Modal modalFunction={()=>{
        inputs.name.validate(inputs.name.value)
        inputs.type.validate(inputs.type.value)
        inputs.monitor.validate(inputs.monitor.value)
        if(inputs.name.valid && inputs.type.valid && inputs.monitor.valid){
            action(user.id, {
                userDisplay: inputs.name.value,
                type: inputs.type.value,
                monitor: inputs.monitor.value
            })
            modal.trigger()
        }
    }} title="Editar Usuario" confirm="Editar" controls={modal}>
        <img src={user.photo} alt="profile" referrerPolicy="no-referrer" />
        <Input {...inputs.name} id="edit-user-name" label="Nombre" placeholder="Nombre para mostrar" />
        <Input {...inputs.type} id="edit-user-type" label="Tipo" placeholder="Tipo de inscripcion" />
        <InputCheck {...inputs.monitor} id="edit-user-monitor" label="Monitor" placeholder={`El usuario ${inputs.monitor.value === true ? "puede" : "no puede"} administrar la instalación`} />
    </Modal>
}

export default EditUser;