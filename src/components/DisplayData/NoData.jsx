import styled from "styled-components"
const Missing = styled.div`
    background: ${({theme}) => theme.outline};
    color: ${({theme}) => theme.surfacev };
    padding-bottom: 1rem;
    border-radius: .25rem;
    margin: 1rem auto;
    max-width: 600px;
    & h4{
        background: ${({theme}) => theme.onsurfv};
        padding: 1rem;
        border-radius: .25rem .25rem 0 0;
        margin-bottom: 1rem;
    }
    & span{
        padding: 0 1rem;
    }
`;
const NoData = ({message, content}) => {
    return <Missing>
        <h4>{message}</h4>
        <span>
            {content}
        </span>
    </Missing>
}
export default NoData