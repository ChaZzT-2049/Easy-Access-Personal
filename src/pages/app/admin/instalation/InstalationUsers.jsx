import { Link, useParams } from "react-router-dom";
import { PageTitle } from "../../../../styled";
import Btn from "../../../../components/UI/Button/Index";
import useCollection from "../../../../hooks/data/useCollection";
import DisplayData from "../../../../components/DisplayData/Index";

const InstalationUsers = () => {
    const {id} = useParams()
    const {collData, loadingColl, errorColl} = useCollection("inscriptions", {whereParams: [
        {wField: "instalationID", op: "==", value: id}
    ]})
    return <>
        <PageTitle>Administrar Usuarios</PageTitle>
        <Link to={`/admin/instalation/${id}/dashboard`}><Btn action="Panel" colors="primary" type="icon inverted" icon="arrow_back" /></Link>
        <DisplayData data={collData} loading={loadingColl} error={errorColl} loader={<div>Cargando</div>} >
            {JSON.stringify(collData)}
        </DisplayData>    
    </>
}
export default InstalationUsers; 