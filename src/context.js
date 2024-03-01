import React, {createContext, useLayoutEffect, useState} from "react";
import { createUserWithEmailAndPassword, sendEmailVerification,
    signInWithEmailAndPassword, applyActionCode,
    onAuthStateChanged, signOut, 
    GoogleAuthProvider, signInWithPopup,
    updateProfile, sendPasswordResetEmail, confirmPasswordReset,
    FacebookAuthProvider, OAuthProvider
} from "firebase/auth";
import { setDoc, doc, getDoc,  } from "firebase/firestore";
import { firebaseAuth, db } from "./firebase";

export const AppContext = createContext()
export const AppProvider = ({children}) => {
    if(!localStorage.getItem("theme")){
        localStorage.setItem("theme", true.toString())
    }
    const [user,setUser] = useState(null)
    const [userData, setUserData] = useState([])
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
    const sendEmailToVerify = async() => {
        sendEmailVerification(firebaseAuth.currentUser).then(() => {
            console.log("Te hemos enviado un correo de verificacion.")
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
    const updateUserData = async(name, apellidos) =>{
        const  userID = firebaseAuth.currentUser.uid
        await setDoc(doc(db, "users", userID), {
            nombre: name,
            apellidos: apellidos,
        }).catch((error) => {
            console.log(error)
        });
    }
    const getUserData = async() => {
        const docRef = doc(db, "users", firebaseAuth.currentUser.uid);
        const suscriptionRef = doc(db, "suscriptions", firebaseAuth.currentUser.uid);
        const docSnap = await getDoc(docRef)
        const suscriptionSnap = await getDoc(suscriptionRef)
        setUserData({...docSnap.data(), suscription: suscriptionSnap.data()})
    }
    const updateSuscription = async() => {
        await setDoc(doc(db, "suscriptions", user.uid), {
            active: true,
            type: "Business"
        }).catch((error) => {
            console.log(error)
        });
        getUserData()
    }
    const SignUp = async(name, apellidos, email, password)=>{
        setLoader("Creando Cuenta")
        return createUserWithEmailAndPassword(firebaseAuth, email, password).then(()=>{
            updateUserData(name, apellidos)
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
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            setUser(currentUser)
            if(currentUser === null){
                setAuth(false)
                setUserData(null)
            }else{
                setAuth(true)
                getUserData()
            }
        });
        return () => unsubscribe();
    },[user])
    const values ={
        auth,
        user,
        userData,
        loader,
        tema,
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
        updateUserData,
        updateSuscription
    }
    return <AppContext.Provider value={values} >{children}</AppContext.Provider>
}
