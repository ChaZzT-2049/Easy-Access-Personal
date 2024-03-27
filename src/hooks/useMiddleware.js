import { crudDoc } from "../firebase.crud"
import useAppContext from "./useAppContext"
const susDoc = crudDoc("suscriptions", localStorage.getItem("uid") || null)
const useMiddleware = () => {
  const {auth, user} = useAppContext()
  const suscription = susDoc.read()
  const previous = localStorage.getItem("previous") || "/home";
  const loginM = {
    redirect:  previous,
    validacion: auth
  }
  const authM = {
    redirect: "/login",
    validacion: (auth === false || user === null),
  }
  const suscriptionM = {
    redirect: "/suscription",
    validacion: (user != null && (!suscription?.data || suscription?.data.type === "Starter")),
    message: "Actualiza tu plan"
  }
  return {
    loginM,
    authM,
    suscriptionM
  }
}
export default useMiddleware