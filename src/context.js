import {createContext, useLayoutEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth} from "./firebase";

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
    const deleteToast = () => {
        setAlerts((a) => a.slice(1));
    }
    const createToast = (newAlert) => {
        setTimeout(() => {
            setAlerts([...alerts, newAlert]);
        }, 500);
        setTimeout(()=>{
            deleteToast()
        },5000)
    };
    const appToast = {
        info: (title, message) =>{
            createToast({variant: "info",title, message})
        },
        success: (title, message) =>{
            createToast({variant: "success",title, message})
        },
        warning: (title, message) =>{
            createToast({variant: "warning",title, message})
        },
        error: (title, message) =>{
            createToast({variant: "error",title, message})
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
