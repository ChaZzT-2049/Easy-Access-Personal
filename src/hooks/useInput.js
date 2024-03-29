import { useState } from "react"

const useInput = (type, validation, defaultValue = "") =>{
    const [value, setValue] = useState(defaultValue);
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
    const clean = () => {
        setValue(defaultValue)
        setError(false)
        setValid(false)
        setMessage("")
    }

    return {
        type,
        value,
        error,
        valid,
        message,
        validate,
        clean
    }
}
export default useInput