import { collection, getDocs, query, where } from "firebase/firestore"
import Input from "../../../components/Form/Input"
import InputCheck from "../../../components/Form/InputCheck"
import Modal from "../../../components/Modal/Index"
import Btn from "../../../components/UI/Button/Index"
import useInput from "../../../hooks/form/useInput"
import useDialog from "../../../hooks/useDialog"
import { validateEmail, validateNames } from "../../../utils/validations"
import { db } from "../../../firebase/firebase"
import { useState } from "react"
import InputSearch from "../../../components/Form/Search"
import styled from "styled-components"

const UserResult = styled.section`
    background: ${({theme}) => theme.secondarycont};
    padding: .25rem;
    border-radius: .5rem;
    display: flex;
    gap: 1rem;
`;
const AddUser = ({instalation, action, id}) => {
    const [newUser, setNewUser] = useState(null)
    const user = useInput("email", validateEmail)
    const type = useInput("text", validateNames)
    const monitor = useInput("checkbox", ()=>{return{fail: false, message: ""}})
    const add = useDialog()
    const cleanInputs = () => {
        user.clean()
        type.clean()
        monitor.clean()
        setNewUser(null)
    }
    const searchUser = () => {
        const ref = collection(db, "users")
        const q = query(ref, where("email", "==", user.value))
        getDocs(q).then((snapshot)=>{
            const results = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setNewUser(results[0])
        })
    }
    return <>
        <Btn onClick={()=>{add.trigger()}} action="Usuario" icon="add" type="icon" colors="primary" />
        <Modal modalFunction={()=>{
            user.validate(user.value)
            type.validate(type.value)
            monitor.validate(monitor.value)
            if(type.valid && newUser.id && user.valid){
                action({
                    userID: newUser.id,
                    userDisplay: newUser.name,
                    type: type.value,
                    monitor: monitor.value,
                    photo: newUser.photo || "",
                    icon: instalation.icon, instDisplay: instalation.name, instID: id,
                    active: true
                })
                add.trigger()
            }
        }} controls={add} confirm="Agregar" title="Agregar Usuario" clean={cleanInputs}>
            <InputSearch {...user} search={searchUser} result={newUser === null ? <></> : <UserResult>
                {newUser === undefined ? <h4>Sin resultados</h4> : <><img src={newUser?.photo} alt="profile" referrerPolicy="no-referrer" />
                <div>
                    <b>Correo: </b>{newUser?.email} . <br />
                    <b>Nombres: </b>{newUser?.name || "Sin un nombre añadido"} .<br />
                    <b>Apellidos: </b>{newUser?.lastname || "Sin apellidos añadidos"} .
                </div></>}
            </UserResult>}label="Usuario" placeholder="Escribe el correo de un usuario" id="user" />
            <Input disabled={true} value={instalation?.name} id="inst" label="Instalación" /><br />
            <Input {...type} label="Tipo de inscripción" id="type" 
            placeholder="Estudiante, personal, servicios, residente, etc."  /> <br />
            <InputCheck {...monitor} label="Monitor" id="monitor" placeholder={`El usuario ${monitor.value === true ? "podrá" : "no podrá"} administrar la instalación`} />
        </Modal>
    </>
}
export default AddUser