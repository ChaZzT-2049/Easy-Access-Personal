import { useState } from "react";

const useToggle = () => {
    const [toggle, setToggle] = useState(false);
    const trigger = () =>{
        setToggle(!toggle)
    }
    return {
        toggle,
        trigger
    }
}
export default useToggle