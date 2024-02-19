const useMiddleware = (route, value) => {
    return {
      redirect: route,
      validacion: value
    }
}
export default useMiddleware