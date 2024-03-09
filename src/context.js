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

    const createToast = (newAlert) => {
        setAlerts([...alerts, newAlert]);
        setTimeout(() => {
          setAlerts((a) => a.slice(1));
        }, 5000);
    };
    const toasts = {
        info: (title, message) =>{
            createToast({variant: "info",title, message})
        },
        success: (title, message) =>{
            createToast({variant: "success",title, message})
        },
        warning: (title, message) =>{
            createToast({variant: "error",title, message})
        },
        error: (title, message) =>{
            createToast({variant: "error",title, message})
        }
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
        toasts,
        setLoader,
        toggleTheme,
    }
    return <AppContext.Provider value={values} >{children}</AppContext.Provider>
}
