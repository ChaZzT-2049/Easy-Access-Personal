import { useContext } from "react";
import { AppContext } from "../../contexts/context";

const useAppContext = () => {
    const appContext = useContext(AppContext);
    return appContext
}

export default useAppContext;