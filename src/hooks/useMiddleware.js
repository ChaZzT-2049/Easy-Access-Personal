import useAppContext from "./useAppContext"
import useDoc from "./useDoc"

const useMiddleware = () => {
  const {auth, user} = useAppContext()
  const uid = user ? user.uid : null
  const susDoc = useDoc("suscriptions", uid)
  const loginM = {
    redirect: "/home",
    validacion: auth
  }
  const authM = {
    redirect: "/login",
    validacion: (auth === false || user === null)
  }
  const suscriptionM = {
    redirect: "/suscription",
    validacion: (user === null || !susDoc.data)
  }
  return {
    loginM,
    authM,
    suscriptionM
  }
}
export default useMiddleware