import { Link } from "react-router-dom";
import { Instalation } from "../../styled/instalation";
import isActive from "../../utils/isActive";
import Btn from "../../components/UI/Button/Index";
import useCollection from "../../hooks/data/useCollection";
import DisplayData from "../../components/DisplayData/Index";
import useAppContext from "../../hooks/app/useAppContext";
import styled from "styled-components"
const InscriptionsContainer = styled.ul`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    justify-content: center;
    @media screen and (min-width: 0px) and (max-width: 480px) {
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: flex-start;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        gap: .5rem;
        & li{
            min-width: 300px;
            scroll-snap-align: center;
            & section{
                width: max-content;
            }
        }
    }
`;
const Inscriptions = () => {
    const {user} = useAppContext()
    const {collData, loadingColl, errorColl} = useCollection("inscriptions", {orderParams: {oField: "active"}, whereParams: [{
        wField: "userID", op: "==", value: localStorage.getItem("uid") || user?.uid
    }]})
    return <DisplayData data={collData} loading={loadingColl} error={errorColl} loader={<>Cargando</>}
        noData={{message: "No tienes inscripciones aún.", content: "Puedes solicitar una a una instalación"}}
    >
        <InscriptionsContainer>{collData && collData.map(inscription => 
            <Instalation className={isActive(inscription.active, "")} key={inscription.id}>
                <section>
                    <h4>{inscription.instDisplay}</h4>
                    <p>{inscription.type}</p>
                    <Link to={`/user/inscription/${inscription.id}/`}>
                        <Btn colors="primary" action="Ver más" type="icon" icon="open_in_new"/>
                    </Link>
                </section>
                <i className="material-icons instalation-icon">{inscription.icon}</i>
            </Instalation>)}
        </InscriptionsContainer>
    </DisplayData>
}

export default Inscriptions;