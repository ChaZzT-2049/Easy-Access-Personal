import styled from "styled-components";
import { Field, FieldInput } from "../../styled"
import Icon from "../UI/Icon/Index";
const SearchContainer = styled.div`
    display: flex;
    position: relative;
    & input {width:100%; appearance: none; -moz-appearance: none; -webkit-appearance: none;}
    &:focus-within button{
        background: ${({theme}) => theme.secondary};
        color: ${({theme}) => theme.onsecondary};
    }
    & input.error ~ button{
        background: ${({theme}) => theme.error};
        color: ${({theme}) => theme.onerror};
    }
    & button{
        background: ${({theme}) => theme.secondarycont};
        color: ${({theme}) => theme.onsecondarycont};
        position: absolute;
        right: 0;
        padding: .40rem .5rem;
        border-radius: .25rem;
        display: flex;
        align-items: center;
        gap: .5rem;

        &:disabled{
            cursor: not-allowed;
        }
    }
`;

const InputSearch = ({label,type,placeholder,id,value, validate, error, message, confirm, disabled, search, result}) => {
    return <Field>
        <label htmlFor={id}>{label}</label>
        <SearchContainer>
            <FieldInput disabled={disabled} className={error && "error"}
                id={id} type={type} placeholder={placeholder} value={value} 
                onChange={(e) => {confirm ? validate(e.target.value, confirm) : validate(e.target.value)}}
                onBlur={(e)=>{confirm ? validate(e.target.value, confirm) : validate(e.target.value)}} 
            />
            <button disabled={error && true} onClick={search}>Buscar <Icon icon="person_search" /></button>
        </SearchContainer>
        {error && <small>{message}</small>}
        <>{result}</>
    </Field>
}
export default InputSearch