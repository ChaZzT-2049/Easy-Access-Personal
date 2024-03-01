import { useLayoutEffect, useRef } from "react";
import useToggle from "./useToggle";
const useDialog = () => {
    const {toggle, trigger} = useToggle()
    const ref = useRef(null)
    
    useLayoutEffect(()=>{
        const handle = () => {
            if(ref.current){
                toggle ? ref.current.showModal() : ref.current.close();
                ref.current.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') {
                    trigger()
                    }
                });
                ref.current.removeEventListener("keydown", handle)
            }
        }
        handle();
    },[toggle, trigger])

    const closeOutside = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const isInDialog=(rect.top <= e.clientY && e.clientY <= rect.top + rect.height
        && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            trigger();
        }
    };

    return {
        ref,
        trigger,
        closeOutside
    }
}
export default useDialog