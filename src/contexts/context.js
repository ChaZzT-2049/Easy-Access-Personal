import {createContext, useLayoutEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth} from "../firebase/firebase";

export const AppContext = createContext()
export const AppProvider = ({children}) => {
    if(!localStorage.getItem("theme")){
        localStorage.setItem("theme", true.toString())
    }
    const [user,setUser] = useState(null)
    const [auth, setAuth] = useState(false)
    const [loader, setLoader] = useState("")
    const [tema, setTema] = useState(localStorage.getItem("theme") === "true")
    const [alerts, setAlerts] = useState([]);
    const deleteToast = (id) => {
        setAlerts((a) => a.filter(alert => alert.id !== id));
    }
    const createToast = (newAlert) => {
        setAlerts([...alerts, newAlert]);
        setTimeout(()=>{
            deleteToast(newAlert.id)
        },4000)
    };
    const appToast = {
        info: (title, message) =>{
            createToast({variant: "info",title, message, id: `I-${Math.random() * alerts.length}`})
        },
        success: (title, message) =>{
            createToast({variant: "success",title, message, id: `S-${Math.random() * alerts.length}`})
        },
        warning: (title, message) =>{
            createToast({variant: "warning",title, message, id: `W-${Math.random() * alerts.length}`})
        },
        error: (title, message) =>{
            createToast({variant: "error",title, message, id: `E-${Math.random() * alerts.length}`})
        },
        delete: deleteToast
    }
    const appLoader = {
        basic: () => {setLoader("Cargando")},
        login: () => {setLoader("Iniciando Sesión")},
        register: () => {setLoader("Creando Cuenta")},
        custom: (message) => {setLoader(message)},
        clearLoader: () => {setLoader("")}
    }
    const toggleTheme = () => {
        localStorage.theme = `${!tema}`
        setTema(!tema)
    }
    useLayoutEffect(()=>{
        const unsubscribe = onAuthStateChanged(firebaseAuth, async(currentUser) => {
            setUser(currentUser)
            if(currentUser === null){
                localStorage.setItem("uid","")
                setAuth(false)
            }else{
                localStorage.setItem("uid", currentUser.uid)
                setAuth(true)
            }
        });
        return () => unsubscribe();
    },[user])
    const values ={
        auth,
        user,
        loader,
        tema,
        alerts,
        appToast,
        appLoader,
        toggleTheme,
    }
    return <AppContext.Provider value={values} >{children}</AppContext.Provider>
}
