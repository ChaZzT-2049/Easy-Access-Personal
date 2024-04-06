import Btn from "../../../components/UI/Button/Index";
import isActive from "../../../utils/isActive";
import styled from "styled-components"
import {useNavigate, useParams} from "react-router-dom"
const AccessContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    & li{
        flex: 1 1 200px;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        gap: 1rem;
        border-radius: .5rem;
        background: ${({theme})=>theme.primarycont};
        & div{
            display: flex;
            gap: 1rem;
            justify-content: space-between;
            flex-wrap: wrap;
            & button{
                flex-grow: 1;
            }
        }
    }
`;
const AccessPointsInstalation = ({data, editAction}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    return <AccessContainer>{data && data.map(accesspoint => <li key={accesspoint.id}>
            <h4>{accesspoint.name} </h4>
            <b>{isActive(accesspoint.active, "Activo", "Inactivo")}</b>
            <div>
                <Btn action="Editar" colors="primary" type="icon" icon="create" />
                <Btn action="Desactivar" colors="primary oncont" type="icon" icon="create" />
            </div>
            <div>
                <Btn onClick={()=>{navigate(`/admin/instalation/${id}/scanner`)}} action="Escanear" colors="primary" type="icon" icon="qr_code" />
                <Btn action="Registros" colors="primary oncont" type="icon" icon="create" />
            </div>
        </li>)}
    </AccessContainer>
}
export default AccessPointsInstalation;