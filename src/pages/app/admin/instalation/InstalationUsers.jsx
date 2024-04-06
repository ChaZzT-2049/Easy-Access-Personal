import { Link, useParams } from "react-router-dom";
import { PageTitle } from "../../../../styled";
import Btn from "../../../../components/UI/Button/Index";
import useCollection from "../../../../hooks/data/useCollection";
import DisplayData from "../../../../components/DisplayData/Index";
import Users from "../../../../features/Admin/Users/Users";
import AddUser from "../../../../features/Admin/Users/AddUser";
import styled from "styled-components";
import useAppContext from "../../../../hooks/app/useAppContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { SkeletonInscriptions } from "../../../../components/UI/Skeletons/Index";
import useInstalationContex from "../../../../hooks/app/useInstalationContext";

const Actions = styled.section`
    & a{text-decoration: none;}
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
    flex-wrap: wrap;
    & h3{
        flex: 0 1 150px;
        text-align: center;
    }
`;
const InstalationUsers = () => {
    const {appToast} = useAppContext()
    const {instalation} = useInstalationContex()
    const {id} = useParams()
    const {collData, loadingColl, errorColl, createCollDoc, updateCollDoc} = useCollection("inscriptions", {whereParams: [
        {wField: "instID", op: "==", value: id}
    ]})
    const addUserAction = async(data) => {
        createCollDoc(data).then(()=>{
            appToast.success("Usuario Agregado", `Se ha agregado el usuario a ${instalation.name}`)
            setDoc(doc(db, "instalations", id), {users: instalation?.users + 1}, {merge: true})
        }).catch((e)=>{
            appToast.error("Hubo algun error", e.code)
        })
    }
    const editUser = async(id, data) => {
        updateCollDoc(id, data).then(()=>{
            appToast.success("Usuario Actualizado", `Se modificado la inscripcion de ${data.userDisplay}`)
        }).catch((e)=>{
            appToast.error("Hubo algun error", e.code)
        })
    }
    const deactivateUser = async(id, data) => {
        updateCollDoc(id, {active: data.active}).then(()=>{
            appToast.success("Usuario Actualizado", `Se modificado la inscripcion de ${data.name}`)
        }).catch((e)=>{
            appToast.error("Hubo algun error", e.code)
        })
    }
    return <>
        <PageTitle>Administrar Usuarios</PageTitle>
        <Actions>
            <Link to={`/admin/instalation/${id}/dashboard`}><Btn action="Panel" colors="primary" type="icon inverted" icon="arrow_back" /></Link>
            <h3>Usuarios de {instalation?.name}</h3>
            <AddUser id={id} instalation={instalation} action={addUserAction} />
        </Actions>
        <DisplayData data={collData} loading={loadingColl} error={errorColl} loader={<SkeletonInscriptions/>}
            noData={{message: "Sin usuarios.", content: "Agrega usuarios a la instalación"}}
        >
            <Users data={collData} editAction={editUser} deactivateAction={deactivateUser}/>
        </DisplayData>
    </>
}
export default InstalationUsers; 