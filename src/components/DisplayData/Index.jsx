import NoData from "./NoData"

const DisplayData = ({data, loading, loader, error, children, noData}) => {
    if(loading) return loader
    return <>
        {error && <li>Error: {error}</li>}
        {data === null || data.length === 0 ? <NoData message={noData} /> : children}
    </>
}
export default DisplayData