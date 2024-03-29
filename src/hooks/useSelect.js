import { useState } from "react"

const useSelect = (options = [], defaultValue = {}) =>{
    const [selected, setSelected] = useState(defaultValue)
    const [error, setError] = useState(false)
    const [valid, setValid] = useState(false)
    const handleOption = (newoption) => {
        setSelected(newoption)
        validate(newoption)
    }
    const validate = (value) => {
        if(!value){
            setError(true)
            setValid(false)
        }else{
            setError(false)
            setValid(true)
        }
    }
    const clean = () => {
        setSelected({})
        setError(false)
        setValid(false)
    }

    return {
        options,
        selected,
        error,
        valid,
        handleOption,
        validate,
        clean
    }
}
export default useSelect