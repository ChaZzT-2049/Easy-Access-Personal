import NoData from "./NoData"
import ErrorData from "./ErrorData"
import { useEffect, useState } from "react"

const DisplayData = ({data, loader, error, children, noData}) => {
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        }, 250)
    },[])
    return <>
        {loading ? loader : <>
            {error && <ErrorData message={error}/>}
            {!error && ((data === undefined) || (Array.isArray(data) && data.length === 0)) ? 
                <NoData {...noData}/> 
                : children 
            }
        </>}
    </>
}
export default DisplayData