import NoData from "./NoData"
import ErrorData from "./ErrorData"
import SecondaryLoader from "./SecondaryLoader"

const DisplayData = ({data, loading, loader, error, children, noData}) => {
    return <div className="content" style={{position: "relative", width: "100%", maxWidth: "1080px"}}>
        {loading && data && <SecondaryLoader />}
        {loading ? loader : <>
            {error && <ErrorData title={error.code} message={error.message}/>}
            {!error && ((data === undefined) || (Array.isArray(data) && data.length === 0)) ? 
                <NoData {...noData}/> 
                : children 
            }
        </>}
    </div>
}
export default DisplayData