import { useLocation } from "react-router-dom"

const useRouteParams = () => {
    const location = useLocation()
    const searcher = new URLSearchParams(location.search)
    const getParam = (param) => {
        return searcher.get(param)
    }
    return getParam
}
export default useRouteParams