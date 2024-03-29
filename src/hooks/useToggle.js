import { useState } from "react";

const useToggle = () => {
    const [toggle, setToggle] = useState(false);
    const trigger = (value) =>{
        if(value){
            setToggle(value)
        }else{
            setToggle(!toggle)
        }
    }
    return {
        toggle,
        trigger
    }
}
export default useToggle