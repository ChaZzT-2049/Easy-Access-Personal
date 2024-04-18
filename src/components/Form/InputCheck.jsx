import { Field, FieldInput } from "../../styled/form"
import styled from "styled-components"

const FieldCheck = styled(Field)`
    display: inline;
    & label{ padding-bottom: 0;}
    & input{margin: 0; margin-inline: .5rem;}
`;

const InputCheck = ({label,placeholder,id,value, validate, error, message}) => {
    return <FieldCheck>
        <label htmlFor={id}>{label}</label>
        <FieldInput className={error && "error"} id={id} type="checkbox" checked={value}
            onChange={(e) => {validate(e.target.checked)}}
            onBlur={(e)=>{validate(e.target.checked)}} 
        /><br />
        {error && <><small>{message}</small> <br /></>}
        <span>{placeholder}</span>
    </FieldCheck>
}
export default InputCheck