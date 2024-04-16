import { useContext } from "react";
import { InstalationContext } from "../../contexts/instalation";

const useInstalationContext = () => {
    const instContext = useContext(InstalationContext);
    return instContext
}

export default useInstalationContext;