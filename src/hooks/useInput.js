import { useState } from "react"

const useInput = (type, validation) =>{
    const initialValue = type === "checkbox" ? false : ""
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(false);
    const [valid, setValid] = useState(false);
    const [message, setMessage] = useState("");

    const validate = (value, confirm) => {
        setValue(value)
        const {fail, description} = validation(value, confirm)
        setError(fail);
        setMessage(description);
        !fail && setValid(true)
    }
    const clear = () => {
        setValue(initialValue)
    }

    return {
        type,
        value,
        error,
        valid,
        message,
        validate,
        clear
    }
}
export default useInput