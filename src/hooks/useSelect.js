import { useState } from "react"

const useSelect = (options) =>{
    const [selected, setSelected] = useState({})
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

    return {
        options,
        selected,
        error,
        valid,
        handleOption,
        validate
    }
}
export default useSelect