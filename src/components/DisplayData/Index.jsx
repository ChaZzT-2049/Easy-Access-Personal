import NoData from "./NoData"
import ErrorData from "./ErrorData"

const DisplayData = ({data, loading, loader, error, children, noData}) => {
    if(loading) return loader
    return <>
        {error && <ErrorData message={error}/>}
        {!error && ((data === undefined) || (Array.isArray(data) && data.length === 0)) ? 
            <NoData {...noData}/> 
            : children }
    </>
}
export default DisplayData