import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider, applyActionCode, confirmPasswordReset, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import useAppContext from "./useAppContext"
import { firebaseAuth } from "../firebase"

const useAuth = () =>{
    const {setLoader, toasts} = useAppContext()

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
        setLoader("Verificando")
        return applyActionCode(firebaseAuth, oobCode).finally(()=>{
            setLoader("")
        })
    }

    const changeName = async(name, lastname) => {
        updateProfile(firebaseAuth.currentUser, {displayName: `${name} ${lastname}`}).catch((error) => {
            console.log(error)
        });
    }

    const signUp = async(name, lastname, email, password)=>{
        setLoader("Creando Cuenta")
        return createUserWithEmailAndPassword(firebaseAuth, email, password).then(async()=>{
            sendEmailToVerify()
            changeName(name, lastname)
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
    
    return {
        login, loginWithGoogle, loginWithFacebook, loginWithMicrosoft,
        signUp,
        logout,
        sendEmailToVerify, verifyEmail,
        changeName,
        forgotPassword, resetPassword
    }
}
export default useAuth