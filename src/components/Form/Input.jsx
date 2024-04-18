import { Field, FieldInput } from "../../styled/form"
const Input = ({label,type,placeholder,id,value, validate, error, message, confirm, disabled}) => {
    return <Field>
        <label htmlFor={id}>{label}</label>
        <FieldInput disabled={disabled} className={error && "error"}
            id={id} type={type} placeholder={placeholder} value={value} 
            onChange={(e) => {confirm ? validate(e.target.value, confirm) : validate(e.target.value)}}
            onBlur={(e)=>{confirm ? validate(e.target.value, confirm) : validate(e.target.value)}} 
        />
        {error && <small>{message}</small>}
    </Field>
}
export default Input