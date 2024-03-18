import NoData from "./NoData"

const DisplayData = ({data, loading, loader, error, children, noData}) => {
    if(loading) return loader
    return <>
        {error && <li>Error: {error}</li>}
        {(data === undefined) || (Array.isArray(data) && data.length === 0) ? 
            <NoData {...noData}/> 
            : children }
    </>
}
export default DisplayData