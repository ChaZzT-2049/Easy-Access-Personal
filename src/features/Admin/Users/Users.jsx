import isActive from "../../../utils/isActive";
import Btn from "../../../components/UI/Button/Index"
import Menu from "../../../components/Menu/ContextMenu";
import { useState } from "react";
import EditUser from "./EditUser";
import useDialog from "../../../hooks/useDialog"
import useInput from "../../../hooks/form/useInput";
import { validateNames } from "../../../utils/validations";
import styled from "styled-components";
import DeactivateUser from "./DeactivateUser";
const UsersContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    margin: 1rem 0;
    & li{
        flex: 1 1 225px;
        position: relative;
        padding: 1rem;
        background: ${({theme})=>theme.surfacev};
        border-radius: .25rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        max-width: 450px;
        & img{
            border-radius: 50%;
            width: 50px;
            height: 50px;
            background: ${({theme})=>theme.outline};
        }
        & div{
            padding-left: 1rem;
            border-left: 2px solid ${({theme})=>theme.primary};
            flex-grow: 1;
        }
        & button{
            align-self: flex-start;
        }
        &.inactive{
            background: ${({theme})=>theme.outline};
            color: ${({theme})=>theme.surfacev}
        }
    }
`;
const Users = ({data, editAction, deactivateAction}) =>{
    const [id, setID] = useState("")
    const [doc, setDoc] = useState({})
    const edit = useDialog()
    const deactivate = useDialog()
    const inputs = {
        name: useInput("text", validateNames),
        type: useInput("text", validateNames),
        monitor: useInput("checkbox", ()=>{return {fail: false, message: ""}})
    }
    const showEdit = () =>{
        inputs.name.validate(doc.userDisplay)
        inputs.type.validate(doc.type)
        inputs.monitor.validate(doc.monitor)
        edit.trigger()
    }
    return <UsersContainer>
        {data && data.map(user => <li key={user.id} className={isActive(user.active, "", "inactive")}>
            <img src={user.photo} alt="profile" referrerPolicy="no-referrer" />
            <div>
                <h3><b>{user.userDisplay}</b></h3>
                <span>{user.type}</span>
                <br />
                <small>Monitor: {user.monitor ? "Si" : "No"}</small>
            </div>
            <Btn onClick={()=>{
                setID(user.id)
                setDoc(user)
            }} type="only-icon" icon="more_horiz" colors="primary oncont" />
            {id === user.id && <Menu cleanRef={()=>{setID("")}}>
                <button onClick={()=>{
                    showEdit()
                }}>Editar usuario</button>
                <hr />
                <button onClick={()=>{
                    if(doc.active){
                        deactivate.trigger()
                    }else{
                        deactivateAction(doc.id, {name: doc.userDisplay, active: !doc.active})
                    }
                }}>{isActive(user.active, "Reactivar", "Desactivar", true)} usuario.</button>
                <hr />
            </Menu>}
        </li>)}
        <EditUser modal={edit} action={editAction} inputs={inputs} user={doc}/>
        <DeactivateUser modal={deactivate} user={doc} action={deactivateAction} />
    </UsersContainer>
}
export default Users