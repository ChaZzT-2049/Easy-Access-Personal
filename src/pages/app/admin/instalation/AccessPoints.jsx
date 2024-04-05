import { doc, setDoc } from "firebase/firestore"
import DisplayData from "../../../../components/DisplayData/Index"
import Btn from "../../../../components/UI/Button/Index"
import AccessPointsInstalation from "../../../../features/Admin/AccessPoints/AccessPoints"
import AddAccessPoint from "../../../../features/Admin/AccessPoints/AddAccessPoint"
import { db } from "../../../../firebase/firebase"
import useAppContext from "../../../../hooks/app/useAppContext"
import useCollection from "../../../../hooks/data/useCollection"
import {PageTitle} from "../../../../styled/index"
import {useLocation, useParams, useNavigate} from "react-router-dom"
import styled from "styled-components"
const Actions = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
`;
const AccessPoints = () => {
    const {appToast} = useAppContext()
    const navigate = useNavigate()
    const {state} = useLocation()
    const {id} = useParams()
    const {collData, loadingColl, errorColl, createCollDoc, updateCollDoc} = useCollection("access-points", {whereParams: [
        {wField: "instID", op: "==", value: id}
    ]})
    const addAction = async(data) =>{
        createCollDoc(data).then(()=>{
            appToast.success("Nuevo punto de acceso", "Acceso creado exitosamente")
            setDoc(doc(db, "instalations", id), {points: state.instalation?.points + 1}, {merge: true})
        }).catch((e)=>{
            appToast.error("Hubo algun error", e.code)
        })
    }
    const editAction = async(id, data) =>{
        updateCollDoc(id, data).then(()=>{
            appToast.success("Punto Actualizado", "Se ha modificado el punto de acceso")
        }).catch((e)=>{
            appToast.error("Hubo algun error", e.code)
        })
    }
    return <>
        <PageTitle>Puntos de Acceso</PageTitle>
        <Actions>
            <Btn onClick={()=>{navigate(`/admin/instalation/${id}/dashboard`)}} action="Panel" colors="primary" type="icon inverted" icon="arrow_back" />
            <h3>Puntos de acceso {state?.instalation.name}</h3>
        </Actions>
        <AddAccessPoint action={addAction} id={id} />
        <DisplayData data={collData} loading={loadingColl} error={errorColl} loader={<>Cargando</>} 
            noData={{message: "Sin puntos de acceso", content: "Crea un punto de acceso."}}
        >
            <AccessPointsInstalation data={collData} editAction={editAction}/>
        </DisplayData>
    </>
}

export default AccessPoints;