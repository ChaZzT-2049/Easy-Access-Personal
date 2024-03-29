import useAppContext from "./useAppContext"
const useMiddleware = () => {
  const {auth, user, suscription} = useAppContext()
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
    validacion: (user != null && (!suscription || suscription.type === "Starter")),
    message: "Actualiza tu plan"
  }
  return {
    loginM,
    authM,
    suscriptionM
  }
}
export default useMiddleware