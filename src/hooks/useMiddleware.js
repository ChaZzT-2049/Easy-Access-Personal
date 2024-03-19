import useAppContext from "./useAppContext"
import useDoc from "./useDoc"

const useMiddleware = () => {
  const {auth, user} = useAppContext()
  const uid = user ? user.uid : null
  const {data} = useDoc("suscriptions", uid)
  const loginM = {
    redirect: "/home",
    validacion: auth
  }
  const authM = {
    redirect: "/login",
    validacion: (auth === false || user === null),
  }
  const suscriptionM = {
    redirect: "/suscription",
    validacion: (user != null && (!data || data.type === "Starter")),
    message: "Actualiza tu plan"
  }
  return {
    loginM,
    authM,
    suscriptionM
  }
}
export default useMiddleware