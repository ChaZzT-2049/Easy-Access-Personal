import styled from "styled-components";

export const Instalations = styled.section`
    & .add{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: .5rem;
    }
    & .content > ul{
        padding: 1rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
`;
export const Instalation = styled.li`
    background: ${({theme}) => theme.secondarycont};
    color: ${({theme}) => theme.onsecondarycont};
    display: flex;
    flex: 1 1 250px;
    max-width: 425px;
    justify-content: space-between;
    align-items: center;
    border-radius: .5rem;
    padding: 1rem;
    gap: .5rem;
    position: relative;
    &.inactive{
        background: ${({theme}) => theme.outline};
        color: ${({theme}) => theme.surfacev};
    }
    & section{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        & h4{font-weight: 700;}
        & a{
            text-decoration: none;
        }
    }
    & .context{
        & button{
            align-self: flex-end;
            padding: 0;
        }
    }
    & .instalation-icon{
        font-size: 5rem;
        cursor: default;
    }
    &.skeleton{
        gap: 1rem;
        & div{
            flex-grow: 1;
            & h4, p { background: ${({theme}) => theme.onsecondarycont}; width: 100%; height: 1.5rem; margin-bottom: .5rem}
            & p{width: 80%;}
        }
        & i{
            width: 3.5rem;
            height: 3.5rem;
            background: ${({theme}) => theme.onsecondarycont};
        }
    }
`;