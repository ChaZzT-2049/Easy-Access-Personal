import styled from "styled-components"
import { Field } from "../../styled/index";
import Icon from "../UI/Icon/Index";

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
    &[popovertarget] {
        anchor-name: --select-button;
    }
    &:has(:popover-open){
        & .dropdown-icon{
            rotate: 180deg;
            transition: rotate 300ms ease-in-out;
        }
    }
    & [popover] {
        anchor-default: --select-button;
        top: anchor(bottom);
        width: anchor-size(width);
        left: anchor(left);
    }
`;
const Options = styled.ul`
    background: ${({theme})=>theme.surfacev};
    color: inherit;
    max-height: 200px;
    border: 2px solid ${({theme})=>theme.outline};
    box-sizing: border-box;
    border-radius: .5rem;
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
const Select = ({name, id, placeholder, label, options, selected, handleOption, error, valid}) => {
    return <Field>
        <label htmlFor={id}>{label}</label>
        <InputSelect className={error && "error"} name={name} id={id} popovertarget={`${id}-options`}>
            <p className="value">{selected.title ? 
                <>{selected.title} <Icon icon={selected.icon}/></> 
                : <>{placeholder} <i className="material-icons dropdown-icon">arrow_drop_down</i></>}
            </p>
            <Options popover="auto" id={`${id}-options`}>
                {options.map((option, i) => <Option key={option.value + i} value={option.value}
                onClick={()=>{
                    handleOption(option)
                }}>
                    {option.title} <Icon icon={option.icon}/>
                </Option>)}
            </Options>
        </InputSelect>
        {error && <small>Debes seleccionar una opción</small>}
    </Field>
}
export default Select