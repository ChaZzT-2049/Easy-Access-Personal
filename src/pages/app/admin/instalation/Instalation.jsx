import { Link, Navigate, useParams } from "react-router-dom";
import { PageTitle } from "../../../../UI";
import useDocument from "../../../../hooks/useDocument";
import DisplayData from "../../../../components/DisplayData/Index";
import styled from "styled-components";
import Btn from "../../../../components/Button/Index"
import { isActive } from "../../../../helpers/isActive";
const MainInfo = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    & h2{
        flex-grow: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
    & a{text-decoration: none;}
`;
const Dashboard = styled.ul`
    margin: 1rem auto;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;
const InfoCard = styled.li`
    flex: 1 0 160px;
    max-width: 280px;
    border-radius: 1rem;
    background: ${({theme})=>theme.surfacev};
    display: flex;
    flex-direction: column;
    & .instalation{font-size: 5rem;}
    & .info{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        padding: 1rem;
    }
    & .action{
        padding: .5rem;
        border-radius: 0 0 1rem 1rem;
        background: ${({theme})=>theme.primary};
        color: ${({theme})=>theme.onprimary};
    }
    & a{
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .5rem;
    }
`;

const Instalation = () => {
    const {id} = useParams()
    const {document, loadingDoc, errorDoc} = useDocument("instalations", id)
    const {name, active, icon, city, users} = document || {name: "", active: true, icon: "villa", city: "", users: 0}
    if(!id){
        return <Navigate to="/admin/panel" />
    }
    return <>
        <PageTitle>Administrar Instalación</PageTitle>
        <MainInfo>
            <Link to="/admin/panel"><Btn action="Panel" colors="primary" type="icon inverted" icon="arrow_back" /></Link>
            <h2>{name} <small>{isActive(active, "Activa", "Inactiva")}</small></h2>
        </MainInfo>
        <DisplayData loader={<>Cargando...</>} loading={loadingDoc} error={errorDoc} data={document}>
            <Dashboard>
                <InfoCard>
                    <div className="info">
                        <i className="material-icons instalation">{icon}</i>
                        <span>{city}</span>
                    </div>
                    <div className="action"></div>
                </InfoCard>
                <InfoCard>
                    <div className="info">
                        <h1><b>3</b></h1>
                        <span>Puntos de Acceso</span>
                    </div>
                    <div className="action">
                        <Link to="/access-points">
                            Administrar <i className="material-icons">fact_check</i>
                        </Link>
                    </div>
                </InfoCard>
                <InfoCard>
                    <div className="info">
                        <h1><b>{users}</b></h1>
                        <span>Usuarios</span>
                    </div>
                    <div className="action">
                        <Link to={`/admin/instalation/${id}/users`}>
                            Administrar <i className="material-icons">fact_check</i>
                        </Link>
                    </div>
                </InfoCard>
                <InfoCard>
                    <div className="info">
                        <h1><b>600</b></h1>
                        <span>Registros</span>
                        <small>Hoy</small>
                    </div>
                    <div className="action">
                        <Link to="/registers">
                            Ver más <i className="material-icons">open_in_new</i>
                        </Link>
                    </div>
                </InfoCard>
                <InfoCard>
                    <div className="info">
                        <h1><b>200</b></h1>
                        <span>Asignaciones</span>
                    </div>
                    <div className="action">
                        <Link to="/users">
                            Ver más <i className="material-icons">open_in_new</i>
                        </Link>
                    </div>
                </InfoCard>
                <InfoCard>
                    <div className="info">
                        <h1><b>8</b></h1>
                        <span>Monitores</span>
                    </div>
                    <div className="action">
                        <Link to="/users">
                            Administrar <i className="material-icons">fact_check</i>
                        </Link>
                    </div>
                </InfoCard>
            </Dashboard>
        </DisplayData>
    </>
}
export default Instalation; 