import styled from "styled-components"
import { PageTitle } from "../../../styled/index"
import Btn from "../../../components/UI/Button/Index"
import DisplayData from "../../../components/DisplayData/Index"
import useAppContext from "../../../hooks/app/useAppContext"
import Icon from "../../../components/UI/Icon/Index"
import useAuth from "../../../hooks/app/useAuth"
import useDocument from "../../../hooks/data/useDocument"
const AccountData = styled.section`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    & img{
        flex: 0 1 150px;
        object-fit: contain;
        &.no-photo{
            min-height: 150px;
            position: relative;
            background: ${({theme}) => theme.outline};
            color: ${({theme}) => theme.surfacev};
            &::after{
                content: "\\E416"; font-family: Material Icons;
                font-size: 5rem;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
    & h3{
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: .5rem;
        & i{
            color: ${({theme}) => theme.primary};
            &:hover{
                outline: 1px solid ${({theme}) => theme.onprimarycont};
                color: ${({theme}) => theme.onprimarycont};
                background: ${({theme}) => theme.primarycont};
            }
        }
    }
    & p{
        margin-bottom: .5rem; display: flex; align-items: center;
        & b{margin-right: .5rem; & i{cursor: default;}}
        & span{
            display: flex;
            align-items: center;
            gap: .25rem;
            padding: 0 .5rem;
            color: ${({theme}) => theme.ok};
            & i{cursor: default;}
            &.no{color: ${({theme}) => theme.error};cursor: pointer;}
        }
    }
`;
const UserData = styled.section`
    & h3{
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: .5rem;
        & i{
            color: ${({theme}) => theme.primary};
            &:hover{
                outline: 1px solid ${({theme}) => theme.onprimarycont};
                color: ${({theme}) => theme.onprimarycont};
                background: ${({theme}) => theme.primarycont};
            }
        }
    }
    & p{
        margin-bottom: .5rem;
    }
    & .skeleton{
        & p{
            height: 1rem;
            width: 15rem;
            background: ${({theme}) => theme.outline};
            & b{
                display: inline-flex;
                width: 5rem;
                height: 1rem;
                background: ${({theme}) => theme.onsurfv};
            }
        }
    }
`;
const Profile = () =>{
    const {user} = useAppContext()
    const {sendEmailToVerify} = useAuth()
    const {document, loadingDoc, errorDoc} = useDocument("users", localStorage.getItem("uid") || null)
    return <>
        <PageTitle>Perfil de Usuario</PageTitle>
        <AccountData>
            <img className={!user.photoURL ? "no-photo" : ""} src={user.photoURL} alt={user.photoURL ? user.displayName : "Sin foto de perfil"} referrerPolicy="no-referrer" />
            <div>
                <h3>Datos de la cuenta <Icon icon="create"/></h3>
                <p><b><Icon icon="account_box"/></b> {user.displayName || "Aun no agregado"}</p>
                <p><b><Icon icon="mail"/></b> {user.email} 
                    {user.emailVerified ? 
                    <span><Icon icon="verified_user"/> Verificado</span> : 
                    <span onClick={()=>{
                        sendEmailToVerify()
                    }} className="no"><Icon icon="remove_moderator"/> Verificar correo</span>}
                </p>
                <p><b><Icon icon="phone"/></b> {user.phoneNumber || "Aun no agregado"}</p> 
            </div>
        </AccountData>
        <hr />
        <UserData>
            <h3>Datos Personales {document && <Icon icon="create"/>}</h3>
            <DisplayData loader={<div className="skeleton"><p><b/></p><p><b/></p></div>} 
                error={errorDoc} data={document} 
                loading={loadingDoc}
                noData={{message: "No haz ingresado tus datos personales.", content: <Btn action="Agregar mis datos" colors="primary"/>}}
            >
                <p><b>Nombre:</b> {document?.name || "Sin nombre agregado"}</p>
                <p><b>Apellidos:</b> {document?.lastname || "Sin apellidos agregados"}</p>
            </DisplayData>
        </UserData>
    </>
}
export default Profile