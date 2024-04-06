import { doc, getDoc } from "firebase/firestore"
import { createContext, useLayoutEffect, useState } from "react"
import {useParams} from "react-router-dom"
import { db } from "../firebase/firebase"
export const InstalationContext = createContext()
export const InstalationProvider = ({children}) => {
    const {id} = useParams()
    const [instalation, setInstalation] = useState({})
    useLayoutEffect(()=>{
        if(id){
            const getData = async() =>{
                await getDoc(doc(db, "instalations", id)).then((snap)=>{
                    setInstalation(snap.data())
                })
            }
            getData()
        }
    },[id])
    const values ={
        instalation,
        setInstalation
    }
    return <InstalationContext.Provider value={values} >{children}</InstalationContext.Provider>
}
