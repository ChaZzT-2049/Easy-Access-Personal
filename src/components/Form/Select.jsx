import styled from "styled-components"
import { Field } from "../../UI";
import Icon from "../Icon/Index";

const InputSelect = styled.button`
    padding: .5rem 1rem;
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    border: 1px solid ${({theme})=>theme.outline};
    border-radius: .25rem;
    background: inherit;
    color: inherit;
    box-sizing: border-box;
    margin-bottom: .5rem;
    &:hover{ background: ${({theme})=>theme.surfacev}; }
    &:focus{
        border-color: ${({theme})=>theme.secondary};
        outline: 3px solid ${({theme})=>theme.secondarycont};
    }
    & p{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &.error{
        border-color: ${({theme})=>theme.error};
        &:focus{
            outline: 3px solid ${({theme})=>theme.errorcont};
        }
    }
    position: relative;
`;
const Options = styled.ul`
    background: inherit;
    color: inherit;
    max-height: 200px;
    width: 95%;
    max-width: 500px;
    overflow-x: hidden;
    overflow-y: scroll;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid ${({theme})=>theme.outline};
    box-sizing: border-box;
`;
const Option = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem 1rem;
    cursor: pointer;
    &:hover{
        background: ${({theme})=>theme.primarycont};
    }
`;
const Select = ({name, id, placeholder, label,  options = [], selected, handleOption, error, valid}) => {
    return <Field>
        <label htmlFor={id}>{label}</label>
        <InputSelect className={error && "error"} popovertarget={`${id}-options`} name={name} id={id}>
            <p>{selected.title ? 
                <>{selected.title} <Icon icon={selected.icon}/></> 
                : <>{placeholder} <Icon icon="arrow_drop_down"/></>}
            </p>
            <Options popover="auto" id={`${id}-options`}>
                {options.map((option, i) => <Option key={option.value + i} value={option.value}
                onClick={async()=>{
                    handleOption(option)
                }}
                >
                    {option.title} <Icon icon={option.icon}/>
                </Option>)}
            </Options>
        </InputSelect>
        {error && <small>Debes seleccionar una opción</small>}
    </Field>
}
export default Select