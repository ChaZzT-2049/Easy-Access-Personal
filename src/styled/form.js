import styled from "styled-components";

export const FormResponse = styled.small`
    font-weight: 700; text-align: center; padding: .5rem; border-radius: .5rem;
    &.error{
        color: ${({theme}) => theme.error};
        background-color: ${({theme}) => theme.errorcont};
    }
    &.response{
        color: ${({theme}) => theme.ok};
        background-color: ${({theme}) => theme.okcont};
    }
`;
export const FormFields = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
export const Field = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    & label{font-weight: 700;padding-bottom: .5rem;}
    & input{margin-bottom: .5rem;};
    &:focus-within label{
        color: ${({theme}) => theme.primary};
        transition: all 200ms ease-in;
    }
    & small{
        color: ${({theme}) => theme.error};
    }
`;
export const FieldInput = styled.input`
    padding: .5rem 1rem;
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    border: 1px solid ${({theme}) => theme.outline};
    border-radius: .25rem;
    background: inherit;
    color: inherit;
    caret-color: ${({theme}) => theme.secondary};
    box-sizing: border-box;
    &:hover{
        background: ${({theme}) => theme.surfacev};
    }
    &:focus{
        border-color: ${({theme}) => theme.secondary};
        outline: 2px solid ${({theme}) => theme.secondarycont};
    }
    &[type="checkbox"]{
        accent-color: ${({theme}) => theme.secondary};
    }
    &:-webkit-autofill{
        -webkit-box-shadow: 0 0 0px 1000px ${({theme}) => theme.bg} inset;
        -webkit-text-fill-color: ${({theme}) => theme.onbg};
    }
    &::placeholder{
        color: ${({theme}) => theme.onsurfv};
    }
    &.error{
        color: ${({theme}) => theme.error};
        border-color: ${({theme}) => theme.error};
        caret-color: ${({theme}) => theme.error};
        &:focus{
            outline: 2px solid ${({theme}) => theme.errorcont};
        }
        &::placeholder{color: ${({theme}) => theme.error};}
    }
    &:disabled{
        background: ${({theme}) => theme.outline};
        color: ${({theme}) => theme.surfacev};
        border-color: ${({theme}) => theme.onsurfv};
        cursor: not-allowed;
        &::placeholder{
            color: ${({theme}) => theme.surfacev};
        }
    }
`;
export const InputColum = styled.section`
    display: flex;
    box-sizing: border-box;
    gap: 1rem;
    & div{
        flex: 1 1 100px;
        & input{width: 100%}
    }
`;