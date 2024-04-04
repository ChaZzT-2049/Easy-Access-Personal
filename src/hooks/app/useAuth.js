import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider, applyActionCode, confirmPasswordReset, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import useAppContext from "./useAppContext"
import { db, firebaseAuth } from "../../firebase/firebase"
import { doc, setDoc } from "firebase/firestore"

const useAuth = () =>{
    const {appToast, appLoader} = useAppContext()
    const login = async(email, password) => {
        appLoader.login()
        return signInWithEmailAndPassword(firebaseAuth, email, password).finally(()=>{
            appLoader.clearLoader()
        })
    }
    const sendEmailToVerify = async() => {
        sendEmailVerification(firebaseAuth.currentUser).then(() => {
            appToast.success("Verifica tu Correo","Hemos enviado un codigo de verificacion a tu correo.")
        }).catch((error) => {
            appToast.error("Correo de verificación fallido", error.code)
        });
    }
    const verifyEmail = async(oobCode) => {
        appLoader.custom("Verificando Correo")
        return applyActionCode(firebaseAuth, oobCode).finally(()=>{
            appLoader.clearLoader()
        })
    }
    const changeName = async(username) => {
        updateProfile(firebaseAuth.currentUser, {displayName: username}).catch((error) => {
            appToast.error("No se pudo actualizar tu nombre de usuario.", error.code)
        });
    }
    const updateUserDoc = async(data) => {
        await setDoc(doc(db, "users", firebaseAuth.currentUser.uid),data, {merge: true})
    }
    const signUp = async(name, lastname, email, password)=>{
        appLoader.register()
        return createUserWithEmailAndPassword(firebaseAuth, email, password).then(async()=>{
            sendEmailToVerify()
            updateUserDoc({name, lastname, email})
        }).finally(()=>{
            appLoader.clearLoader()
        });
    }
    const loginWithGoogle = async() => {
        appLoader.login()
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(firebaseAuth, googleProvider).then((UserCredential) => {
            const name = UserCredential.user.displayName.split(" ", 4)
            updateUserDoc({
                email: UserCredential.user.email, 
                photo: UserCredential.user.photoURL,
                name: name[0] + " " + name[1],
                lastname: name[2] + " " + name[3]
            })
        }).finally(()=>{
            appLoader.clearLoader()
        });
    }
    const loginWithFacebook = async() => {
        appLoader.login()
        const facebookProvider = new FacebookAuthProvider()
        return signInWithPopup(firebaseAuth, facebookProvider).then((UserCredential) => {
            const name = UserCredential.user.displayName.split(" ", 4)
            updateUserDoc({
                email: UserCredential.user.email, 
                photo: UserCredential.user.photoURL,
                name: name[0] + " " + name[1],
                lastname: name[2] + " " + name[3]
            })
        }).finally(()=>{
            appLoader.clearLoader()
        });
    }
    const loginWithMicrosoft = async() => {
        appLoader.login()
        const microsoftProvider = new OAuthProvider('microsoft.com')
        return signInWithPopup(firebaseAuth, microsoftProvider).then((UserCredential) => {
            const name = UserCredential.user.displayName.split(" ", 4)
            updateUserDoc({
                email: UserCredential.user.email, 
                photo: UserCredential.user.photoURL,
                name: name[0] + " " + name[1],
                lastname: name[2] + " " + name[3]
            })
        }).finally(()=>{
            appLoader.clearLoader()
        });
    }
    const logout = () => {
        appLoader.custom("Cerrando Sesión")
        signOut(firebaseAuth).catch((error)=>{
            appToast.error("Error al cerrar sesión.", error.code)
        }).finally(()=>{
            appLoader.clearLoader()
        })
    }
    const forgotPassword = async(email) =>{
        appLoader.custom("Enviando correo de recuperación.")
        return sendPasswordResetEmail(firebaseAuth, email).finally(()=>{
            appLoader.clearLoader()
        });
    }
    const resetPassword = async(oobCode, newPassword) =>{
        appLoader.custom("Cambiando contraseña.")
        return confirmPasswordReset(firebaseAuth, oobCode, newPassword).finally(()=>{
            appLoader.clearLoader()
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