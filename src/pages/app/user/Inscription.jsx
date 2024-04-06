import DisplayData from "../../../components/DisplayData/Index";
import useDocument from "../../../hooks/data/useDocument";
import { PageTitle } from "../../../styled";
import {useParams} from "react-router-dom"
import styled, { useTheme } from "styled-components"
import Modal from "../../../components/Modal/Index"
import Btn from "../../../components/UI/Button/Index"
import useDialog from "../../../hooks/useDialog"
import QRCode from "react-qr-code";
import useAppContext from "../../../hooks/app/useAppContext";
import isActive from "../../../utils/isActive";
const UserQR = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: .5rem;
    padding: 0;
    & img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
`;
const Inscription = () => {
    const {user} = useAppContext()
    const colors = useTheme()
    const {id} = useParams()
    const {document, loadingDoc, errorDoc} = useDocument("inscriptions", id)
    const showQR = useDialog()
    return <>
        <PageTitle>Inscripcion</PageTitle>
        <DisplayData loading={loadingDoc} error={errorDoc} data={document} loader={<>Cargando</>}
            noData={{message: "No se pudo obtener la inscripción", content: "Intenta más tarde"}}
        >
            <h3>{document?.instDisplay}</h3>
        </DisplayData>
        <Btn action="Mostrar QR" type="icon" colors="primary" icon="qr_code" onClick={()=>{
            showQR.trigger()
        }}/>
        <Modal controls={showQR}>
            <UserQR>
                <img src={user?.photoURL} alt="profile" referrerPolicy="no-referrer" />
                <h4>{user?.displayName}</h4>
                <QRCode value={user?.uid} bgColor={colors.bg} fgColor={colors.onbg} 
                    style={{ maxWidth: "600px", width: "90%" }}
                />
                <p><b>{document?.instDisplay}</b> - {document?.type}</p>
                <small>{isActive(document?.active, "Activo", "Inactivo")}</small>
            </UserQR>
        </Modal>
    </>
}
export default Inscription;