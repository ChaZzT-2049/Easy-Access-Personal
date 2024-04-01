import { Link, useParams } from "react-router-dom";
import { PageTitle } from "../../../../UI";
import Btn from "../../../../components/Button/Index";

const InstalationUsers = () => {
    const {id} = useParams()
    return <>
        <PageTitle>Administrar Usuarios</PageTitle>
        <Link to={`/admin/instalation/${id}/dashboard`}><Btn action="Panel" colors="primary" type="icon inverted" icon="arrow_back" /></Link>
    </>
}
export default InstalationUsers; 