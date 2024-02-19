import { useState } from "react"

const useInput = (type, validation) =>{
    const [value, setValue] = useState(type === "checkbox" ? false : "");
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

    return {
        type,
        value,
        error,
        valid,
        message,
        validate
    }
}
export default useInput