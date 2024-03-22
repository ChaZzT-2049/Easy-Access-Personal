import useAppContext from "./useAppContext"
import useDoc from "./useDoc"
window.onbeforeunload = () => {
  localStorage.setItem("previous", window.location.pathname)
}
const useMiddleware = () => {
  const {auth, user} = useAppContext()
  const uid = user ? user.uid : null
  const {data} = useDoc("suscriptions", uid)
  const previous = localStorage.getItem("previous")
  const loginM = {
    redirect:  previous === "/" ? "/home" : previous,
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