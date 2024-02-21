import React, {createContext, useLayoutEffect, useState} from "react";
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    onAuthStateChanged, signOut, 
    GoogleAuthProvider, signInWithPopup,
    updateProfile, sendPasswordResetEmail, confirmPasswordReset
} from "firebase/auth";
import { firebaseAuth } from "./firebase";

export const AppContext = createContext()
export const AppProvider = ({children}) => {
    if(!localStorage.getItem("theme")){
        localStorage.setItem("theme", true.toString())
    }
    const [user,setUser] = useState(null)
    const [auth, setAuth] = useState(false)
    const [loader, setLoader] = useState("")
    const [tema, setTema] = useState(localStorage.getItem("theme") === "true")

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
    const SignUp = async(name, apellidos, email, password)=>{
        setLoader("Creando Cuenta")
        return createUserWithEmailAndPassword(firebaseAuth, email, password).then(()=>{
            updateProfile(firebaseAuth.currentUser, {displayName: `${name} ${apellidos}`}).catch((error) => {
                console.log(error)
            });
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
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            setUser(currentUser)
            if(user != null){
                setAuth(true)
            }else{
                setAuth(false)
            }
        });
        return () => unsubscribe();
    },[user])
    const values ={
        auth,
        user,
        loader,
        tema,
        setLoader,
        toggleTheme,
        SignUp,
        login,
        loginWithGoogle,
        logout,
        forgotPassword,
        resetPassword
    }
    return <AppContext.Provider value={values} >{children}</AppContext.Provider>
}
