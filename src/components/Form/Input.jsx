import { Field, FieldInput } from "../../UI"
const Input = ({label,type,placeholder,id,value, validate, error, message}) => {
    return <Field>
        <label htmlFor={id}>{label}</label>
        <FieldInput className={error && "error"}
            id={id} type={type} placeholder={placeholder} value={value} 
            onChange={(e) => {validate(e.target.value)}}
            onBlur={(e)=>{validate(e.target.value)}} 
        />
        {error && <small>{message}</small>}
    </Field>
}
export default Input