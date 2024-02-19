import { Field, FieldInput } from "../../UI"
import styled from "styled-components"

const FieldCheck = styled(Field)`
    flex-direction: row;
    align-items: center;
    & label small{color: ${({theme}) => theme.onbg};}
`;

const InputCheck = ({label,placeholder,id,value, validate, error, message}) => {
    return <FieldCheck>
        <label htmlFor={id}><small>{label}</small></label>
        <FieldInput className={error && "error"} id={id} type="checkbox" placeholder={placeholder} checked={value}
            onChange={(e) => {validate(e.target.checked)}}
            onBlur={(e)=>{validate(e.target.checked)}} 
        />
        {error && <small>{message}</small>}
    </FieldCheck>
}
export default InputCheck