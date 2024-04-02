import { useState } from "react"
import { Instalation } from "../../styled/index"
import useDialog from "../../hooks/useDialog"
import useInput from "../../hooks/form/useInput"
import useSelect from "../../hooks/form/useSelect"
import { validateInstalation, validateNames } from "../../utils/validations"
import Btn from "../../components/UI/Button/Index"
import InstalationEdit from "./InstalationEdit"
import { icons } from "./icons"
import InstalationDeactivate from "./InstalationDeactivate"
import { Link } from "react-router-dom"
import isActive from "../../utils/isActive"
import Menu from "../../components/Menu/ContextMenu"
const AdminInstalations = ({data, editAction, deactivate}) => {
    const edit = useDialog()
    const deactivateModal = useDialog()
    const name = useInput("text", validateInstalation)
    const city = useInput("text", validateNames)
    const icon = useSelect(icons)
    const [id, setID] = useState("")
    const [doc, setDoc] = useState({})
    const cleanInputs = () => {
        name.clean()
        city.clean()
        icon.clean()
    }
    const showEditForm = (values) => {
        name.validate(values.name)
        city.validate(values.city)
        icon.handleOption({value: values.icon, title: "Icono actual: ", icon: values.icon})
        edit.trigger()
    }
    return <>
        <ul>{data && data?.map(instalation =>
            <Instalation className={isActive(instalation.active, "")} key={instalation.id}>
                <section>
                    <h4>{instalation.name}</h4>
                    <p>{instalation.city}</p>
                    <Link to={`/admin/instalation/${instalation.id}/dashboard`}>
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
                    <i className="material-icons instalation-icon">{instalation.icon}</i>
                </section>
                {id === instalation.id && <Menu cleanRef={()=>{setID("")}}>
                    <button onClick={()=>{
                        showEditForm(doc, {name, city, icon}, edit.trigger)
                    }}>Editar Instalacion</button>
                    <hr />
                    <button onClick={()=>{
                        deactivateModal.trigger()
                    }}>{isActive(instalation.active, "Reactivar", "Desactivar", true)} Instalacion</button>
                    <hr />
                </Menu>}
            </Instalation>)}
        </ul>
        <InstalationEdit doc={doc} action={editAction} clean={cleanInputs} controls={edit} name={name} icon={icon} city={city} />
        <InstalationDeactivate doc={doc} action={deactivate} controls={deactivateModal}  />
    </>
}
export default AdminInstalations