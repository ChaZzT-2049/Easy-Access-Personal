import useAppContext from "./useAppContext"

const useMiddleware = () => {
  const {auth, user, userData} = useAppContext()
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
    validacion: !(userData && userData.suscription)
  }
  return {
    loginM,
    authM,
    suscriptionM
  }
}
export default useMiddleware