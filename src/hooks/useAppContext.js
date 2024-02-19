import { useContext } from "react";
import { AppContext } from "../context";

const useAppContext = () => {
    const appContext = useContext(AppContext);
    return appContext
}

export default useAppContext;