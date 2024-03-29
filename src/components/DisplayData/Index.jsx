import NoData from "./NoData"
import ErrorData from "./ErrorData"

const DisplayData = ({data, loading, loader, error, children, noData}) => {
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