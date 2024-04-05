import Input from "../../../components/Form/Input";
import Btn from "../../../components/UI/Button/Index";
import useInput from "../../../hooks/form/useInput";
import { validateNames } from "../../../utils/validations";
import styled from "styled-components"
const HiddenForm = styled.details`
    max-width: 600px;
    margin: 1rem auto;
    border: 2px solid ${({theme})=>theme.primary};
    border-radius: 0 0 .6rem .6rem;
    transition: all 200ms ease-in;
    &[open]{
        border-color: ${({theme})=>theme.outline};
    }
    & summary{
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: ${({theme})=>theme.primary};
        color: ${({theme})=>theme.onprimary};
        border-radius: 0 0 .5rem .5rem;
        cursor: pointer;
        &::marker{

        }
    }
    & form{
        padding: 1rem;
    }
`;
const AddAccessPoint = ({action, id}) => {
    const name = useInput("text", validateNames)
    return <HiddenForm>
        <summary>Nuevo punto de acceso <i className="material-icons">add</i></summary>
        <form onSubmit={(e)=>{
            e.preventDefault()
            name.validate(name.value)
            if(name.valid){
                action({instID: id, name: name.value, active: true})
                name.clean()
            }
        }}>
            <Input {...name} id="access-name" placeholder="Escribe un nombre" label="Nombre" />
            <Btn action="Agregar" colors="primary cont" />
        </form>
    </HiddenForm>
}

export default AddAccessPoint;