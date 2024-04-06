import { useParams } from "react-router-dom";
import useCollection from "../../../../hooks/data/useCollection";
import RecordsInstalation from "../../../../features/Admin/Records/Records";
import { PageTitle } from "../../../../styled";
import DisplayData from "../../../../components/DisplayData/Index";

const Records = () => {
    const {id} = useParams()
    const {collData, loadingColl, errorColl} = useCollection("records", {whereParams: [
        {wField: "instID", op: "==", value: id}
    ]}, true)
    return <>
        <PageTitle>Registros</PageTitle>
        <DisplayData data={collData} loading={loadingColl} error={errorColl} loader={<>Cargando</>}
            noData={{message: "Sin Registros.", content: "Espera a que sucesa un acceso."}}
        >
            <RecordsInstalation data={collData}/>
        </DisplayData>
    </>
}

export default Records;