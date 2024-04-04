import Modal from "../../../components/Modal/Index";

const DeactivateUser = ({modal, user, action}) => {
    return <Modal modalFunction={()=>{
        action(user.id, {name: user.userDisplay, active: !user.active})
        modal.trigger()
    }} controls={modal} title="Desactivar Usuario" confirm="Desactivar" type="warning">
        {user.active !== false && <p>
            <b>Advertencia:</b> <small>
                Desactivar al usuario hara que ya no pueda acceder a la instalación, sin embargo
                sus registros previos estarán disponibles.
            </small>
        </p>}
    </Modal>
}
export default DeactivateUser;