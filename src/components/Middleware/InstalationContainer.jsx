import { Outlet, useParams } from "react-router-dom"
import Middleware from "./Index"
import useDocument from "../../hooks/data/useDocument"
import useAppContext from "../../hooks/app/useAppContext"
import useCollection from "../../hooks/data/useCollection"

const InstalationContainer = () => {
    const {user, appToast, appLoader} = useAppContext()
    const {id} = useParams()
    const {document, loadingDoc} = useDocument("instalations", id)
    const {collData, loadingColl} = useCollection("inscriptions", {whereParams: [
        {wField: "instalationID", op: "==", value: id},
        {wField: "userID", op: "==", value: user.uid}
    ]})
    const ownerSuscription = useDocument("suscriptions", document?.user || user.uid)
    if(loadingDoc && loadingColl && ownerSuscription.loadingDoc){
        return appLoader.custom("Validando")
    }
    appLoader.clearLoader()
    const isNotOwner = document && document.user !== user.uid
    const isNotMonitor = collData && collData[0]?.monitor !== true
    const isSuscriptionInactive = ownerSuscription.document && ownerSuscription.document?.active !== true
    return <Middleware redirect="/admin/panel" 
        validacion={(id && (isNotOwner && isNotMonitor)) || isSuscriptionInactive}
        alert={appToast.warning}
        message={`${isSuscriptionInactive ? "La suscripcion del dueño debe estar activa" : "No tienes permisos para administrar esta instalación"}`}
    >
        <Outlet />
    </Middleware>
}
export default InstalationContainer