import { Outlet, useParams } from "react-router-dom"
import Middleware from "./Index"
import useAppContext from "../../hooks/app/useAppContext"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { useState, useLayoutEffect } from "react"
import SecondaryLoader from "../DisplayData/SecondaryLoader"
const getInstalation = async(id) => {
    let instalation
    await getDoc(doc(db, "instalations", id)).then((snap)=>{
        instalation = snap.data()
    })
    return instalation
}
const getSuscription = async(id) =>{
    let suscription
    await getDoc(doc(db, "suscriptions", id)).then((snap)=>{
        suscription = snap.data()
    })
    return suscription
}
const getInscription = async(inst, user) => {
    let inscription
    const q = query(collection(db, "inscriptions"), where("instID", "==", inst), where("userID", "==", user))
    await getDocs(q).then((snapshot)=>{
        const results = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        inscription = results[0]
    })
    return inscription
}
const InstalationContainer = () => {
    const [isNotOwner, setIsnotO] = useState(true)
    const [isNotMonitor, setIsnotM] = useState(true)
    const [isMonitorInactive, setIsMonitorI] = useState(true)
    const [isSuscriptionInactive, setIsSuscriptionI] = useState(true)
    const {appToast} = useAppContext()
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    
    useLayoutEffect(()=>{
        getInstalation(id).then(inst=>{
            setIsnotO(inst.user !== localStorage.getItem("uid"))
            getSuscription(inst.user).then(sus => {
                setIsSuscriptionI(sus?.active !== true)
            })
            getInscription(id, localStorage.getItem("uid")).then(insc=>{
                setIsnotM(insc?.monitor !== true)
                setIsMonitorI(insc?.active !== true)
            }).finally(()=>{
                setLoading(false)
            })
        })
    },[id])
    if(loading){
        return <SecondaryLoader>Validando permisos</SecondaryLoader>
    }
    return <Middleware redirect="/admin/panel" 
        validacion={(id) && ((isNotOwner && isNotMonitor && isMonitorInactive) || isSuscriptionInactive)}
        alert={appToast.warning}
        message={`"La suscripcion del dueño debe estar activa" : "No tienes permisos para administrar esta instalación"}`}
    >
        <Outlet />
    </Middleware>
}
export default InstalationContainer