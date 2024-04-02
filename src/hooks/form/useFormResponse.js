import { useState } from "react";

const useFormResponse = () => {
    const [response, setResponse] = useState("");
    const [type, setType] = useState("")

    const showResponseMessage = (message) => {
        setType("response")
        setResponse(message)
    }
    const showResponseError = (message) => {
        setType("error")
        setResponse(message)
    }

    return{
        response,
        type,
        showResponseMessage,
        showResponseError
    }
}

export default useFormResponse;