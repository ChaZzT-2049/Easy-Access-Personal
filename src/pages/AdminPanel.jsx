import AppTemplate from "../components/Template/Index"
import Btn from "../components/Button/Index"
import useAppContext from "../hooks/useAppContext"
import useDoc from "../hooks/useDoc"
import { PageTitle } from "../UI"
import useCollection from "../hooks/useCollection"
import styled from "styled-components"
import DisplayData from "../components/DisplayData/Index"

const Instalations = styled.section`
    & h2{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: .5rem;
    }
    & ul {
        padding: 1rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
`;
const Instalation = styled.li`
    background: ${({theme}) => theme.secondarycont};
    color: ${({theme}) => theme.onsecondarycont};
    display: flex;
    flex: 0 1 200px;
    justify-content: space-between;
    align-items: center;
    border-radius: .5rem;
    padding: 1rem;
    height: 90px;
    gap: .5rem;
    & div{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & h4{font-weight: 700;}
    }
    & .actions{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: .5rem;
    }
    & .icon{
        font-size: 3.5rem;
        cursor: default;
    }
`
const AdminPanel = () => {
    const {user} = useAppContext()
    const susDoc = useDoc("suscriptions", user.uid)
    const [instalations, loading, error ] = useCollection("instalations","", `user:==:${user.uid}`)
    return <AppTemplate>
        <PageTitle>Panel de Administrador</PageTitle>
        {susDoc.data && susDoc.data.active ? 
           <Instalations>   
                <h2>
                    Tus instalaciones:
                    <Btn type="icon" colors="primary" action="Crear Instalacion" icon="add_box" />
                </h2>
                <DisplayData data={instalations} error={error} loading={loading} loader="Cargando"
                    noData={{message: "No tienes Instalaciones creadas.", content: "Intenta crear una instalacion."}}
                >
                    <ul>{instalations.map(instalation => 
                        <Instalation key={instalation.id}>
                            <div>
                                <h4>{instalation.name}</h4>
                                <p>{instalation.city}</p>
                                <div className="actions">
                                    <Btn colors="primary" type="only-icon" icon="create"></Btn>
                                    <Btn colors="primary" type="only-icon" icon="open_in_new"></Btn>
                                </div>
                            </div>
                            <i className="material-icons icon">{instalation.icon}</i>
                        </Instalation>)}
                    </ul>
                    </DisplayData>
            </Instalations> : <span>Activa tu suscripcion de nuevo</span>
        }
    </AppTemplate>
}
export default AdminPanel