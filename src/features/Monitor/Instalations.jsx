import { useState } from "react"
import { Instalation } from "../../styled/instalation"
import useDialog from "../../hooks/useDialog"
import InstalationEdit from "./InstalationEdit"
import InstalationContext from "../../components/Menu/ContextMenu"
import { icons } from "../Admin/Instalations/icons"
import useSelect from "../../hooks/form/useSelect"
import useInput from "../../hooks/form/useInput"
import { validateInstalation } from "../../utils/validations"
import isActive from "../../utils/isActive"
import { Link } from "react-router-dom"
import Btn from "../../components/UI/Button/Index"

const MonitorInstalations = ({data, editAction}) => {
    const edit = useDialog()
    const name = useInput("text", validateInstalation)
    const icon = useSelect(icons)
    const [id, setID] = useState("")
    const [doc, setDoc] = useState({})
    const cleanInputs = () => {
        name.clean()
        icon.clean()
    }
    const showEditForm = (values) => {
        name.validate(values.instDisplay)
        icon.handleOption({value: values.icon, title: "Icono actual: ", icon: values.icon})
        edit.trigger()
    }
    return <>
        <ul>{data && data?.map(instalation =>
            <Instalation className={isActive(instalation.active, "")} key={instalation.id}>
                <section>
                    <h4>{instalation.instDisplay}</h4>
                    <p>{instalation.type}</p>
                    <Link to={`/admin/instalation/${instalation.instID}/dashboard`}>
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
                {id === instalation.id && <InstalationContext cleanRef={()=>{setID("")}}>
                    <button disabled={instalation.active === false} onClick={()=>{
                        showEditForm(doc, {name, icon}, edit.trigger)
                    }}>Editar Instalacion</button>
                    <hr />
                </InstalationContext>}
            </Instalation>)}
            <InstalationEdit baseID="monitor" doc={doc} action={editAction} clean={cleanInputs} controls={edit} name={name} icon={icon} />
        </ul>
    </>
}

export default MonitorInstalations