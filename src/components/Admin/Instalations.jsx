import { useRef, useState } from "react"
import { Instalation } from "../../UI"
import useDialog from "../../hooks/useDialog"
import useInput from "../../hooks/useInput"
import useSelect from "../../hooks/useSelect"
import { validateNameApellidos } from "../../validations"
import Btn from "../Button/Index"
import InstalationEdit from "./InstalationEdit"
import { icons } from "./icons"
import styled from "styled-components"
import InstalationDeactivate from "./InstalationDeactivate"
import { Link } from "react-router-dom"
const ContextMenu = styled.dialog`
    inset: unset;
    background: ${({theme}) => theme.surfacev};
    border-radius: .5rem;
    position: absolute;
    width: 200px;
    height: max-content;
    top: 1rem;
    right: 1rem;
    box-sizing: border-box;
    margin: auto;
    border: none;
    padding: 0;
    z-index: 1;
    & button{
        padding: 1rem;
        width: 100%;
        text-align: left;
        color: ${({theme}) => theme.onsurfv};
    }
    & hr{
        border-top: 2px solid ${({theme}) => theme.outline};
        margin: 0;
    }
`
const AdminInstalations = ({data, editAction, deactivate}) => {
    const edit = useDialog()
    const deactivateModal = useDialog()
    const name = useInput("text", validateNameApellidos)
    const city = useInput("text", validateNameApellidos)
    const icon = useSelect(icons)
    const [id, setID] = useState("")
    const [doc, setDoc] = useState({})
    const cleanInputs = () => {
        name.clean()
        city.clean()
        icon.clean()
    }
    const menuRef = useRef(null)
    const showEditForm = (values) => {
        name.validate(values.name)
        city.validate(values.city)
        icon.handleOption({value: values.icon, title: "Icono actual: ", icon: values.icon})
        edit.trigger()
    }
    return <>
        <ul>{data && data?.map(instalation =>
            <Instalation className={instalation.active === false ? "inactive" : ""} key={instalation.id}>
                <section>
                    <h4>{instalation.name}</h4>
                    <p>{instalation.city}</p>
                    <Link to={`/admin/instalation/${instalation.id}`} className="actions">
                        <Btn colors="primary" action="Ver Instalación" type="icon" icon="open_in_new"/>
                    </Link>
                </section>
                <section className="context">
                    <Btn colors="primary" type="only-icon" icon="more_horiz"
                        onClick={()=>{
                            setID(instalation.id)
                            setDoc(instalation)
                        }}
                    />
                    <i className="material-icons icon">{instalation.icon}</i>
                </section>
                {id === instalation.id && <ContextMenu ref={menuRef} open={true}>
                    <button onClick={()=>{
                        showEditForm(doc, {name, city, icon}, edit.trigger)
                        setID("")
                        menuRef.current.close()
                    }}>Editar Instalacion</button>
                    <hr />
                    <button onClick={()=>{
                        deactivateModal.trigger()
                        setID("")
                        menuRef.current.close()
                    }}>{instalation.active === false ? "Reactivar" : "Desactivar"} Instalacion</button>
                    <hr />
                    <button onClick={()=>{
                        menuRef.current.close()
                        setID("")
                    }}>Cancelar</button>
                </ContextMenu>}
            </Instalation>)}
        </ul>
        <InstalationEdit doc={doc.id} action={editAction} clean={cleanInputs} controls={edit} name={name} icon={icon} edit={edit} city={city} />
        <InstalationDeactivate doc={doc} action={deactivate} controls={deactivateModal}  />
    </>
}
export default AdminInstalations