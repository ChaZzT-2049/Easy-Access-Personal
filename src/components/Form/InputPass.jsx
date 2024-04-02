import { Field, FieldInput } from "../../styled/index"
import Icon from "../UI/Icon/Index"
import styled from "styled-components"
import useToggle from "../../hooks/useToggle";
const PassContainer = styled.div`
    display: flex;
    position: relative;
    & input {width:100%; appearance: none; -moz-appearance: none; -webkit-appearance: none;}
    & i{position: absolute;right: 0;margin: .45rem 1rem;}
`;

const InputPass = ({label,placeholder,id,value, validate, confirm, error, message}) => {
    const {toggle, trigger} = useToggle()
    return <Field>
        <label htmlFor={id}>{label}</label>
        <PassContainer>
            <FieldInput id={id} type={toggle ? "text" : "password"} className={error && "error"}
                placeholder={placeholder} 
                value={value} 
                onChange={(e) => {confirm ? validate(e.target.value, confirm) : validate(e.target.value)}}
                onBlur={(e)=>{confirm ? validate(e.target.value, confirm) : validate(e.target.value)}} 
            />
            <Icon onClick={() => {trigger()}} icon={toggle ? "visibility" : "visibility_off"}/>
        </PassContainer>
        {error && <small>{message}</small>}
    </Field>
}

export default InputPass