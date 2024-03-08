import {createContext, useLayoutEffect, useState} from "react";
import { createUserWithEmailAndPassword, sendEmailVerification,
    signInWithEmailAndPassword, applyActionCode,
    onAuthStateChanged, signOut, 
    GoogleAuthProvider, signInWithPopup,
    updateProfile, sendPasswordResetEmail, confirmPasswordReset,
    FacebookAuthProvider, OAuthProvider
} from "firebase/auth";
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
    const login = async(email, password) => {
        setLoader("Iniciando Sesión")
        return signInWithEmailAndPassword(firebaseAuth, email, password).finally(()=>{
            setLoader("")
        })
    }
    const sendEmailToVerify = async() => {
        sendEmailVerification(firebaseAuth.currentUser).then(() => {
            toasts.success("Verifica tu Correo","Hemos enviado un codigo de verificacion a tu correo.")
        }).catch((error) => {
            console.log(error)
        });
    }
    const verifyEmail = async(oobCode) => {
        return applyActionCode(firebaseAuth, oobCode)
    }
    const ChangeName = async(name) => {
        updateProfile(firebaseAuth.currentUser, {displayName: `${name}`}).catch((error) => {
            console.log(error)
        });
    }
    const SignUp = async(name, apellidos, email, password)=>{
        setLoader("Creando Cuenta")
        return createUserWithEmailAndPassword(firebaseAuth, email, password).then(async()=>{
            sendEmailToVerify()
        }).finally(()=>{
            setLoader("")
        });
    }
    
    const loginWithGoogle = async() => {
        setLoader("Iniciando Sesión")
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(firebaseAuth, googleProvider).finally(()=>{
            setLoader("")
        });
    }
    const loginWithFacebook = async() => {
        setLoader("Iniciando Sesión")
        const facebookProvider = new FacebookAuthProvider()
        return signInWithPopup(firebaseAuth, facebookProvider).finally(()=>{
            setLoader("")
        });
    }
    const loginWithMicrosoft = async() => {
        setLoader("Iniciando Sesión")
        const microsoftProvider = new OAuthProvider('microsoft.com')
        return signInWithPopup(firebaseAuth, microsoftProvider).finally(()=>{
            setLoader("")
        });
    }
    const logout = () => {
        setLoader("Cerrando Sesion")
        signOut(firebaseAuth).catch((e)=>{
            console.log(e)
        }).finally(()=>{
            setLoader("")
        })
    }
    const forgotPassword = async(email) =>{
        setLoader("Enviando correo de recuperación.")
        return sendPasswordResetEmail(firebaseAuth, email).finally(()=>{
            setLoader("")
        });
    }
    const resetPassword = async(oobCode, newPassword) =>{
        setLoader("Cambiando contraseña.")
        return confirmPasswordReset(firebaseAuth, oobCode, newPassword).finally(()=>{
            setLoader("")
        });
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
        SignUp,
        login,
        loginWithGoogle,
        loginWithFacebook,
        loginWithMicrosoft,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        ChangeName,
    }
    return <AppContext.Provider value={values} >{children}</AppContext.Provider>
}
