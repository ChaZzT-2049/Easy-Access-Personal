import styled from "styled-components";

const Plan = styled.div`
    background-color: ${({theme}) => theme.surfacev};
    padding: 1rem;
    opacity: .7;
    & h4{
        background-color: ${({theme}) => theme.onsurfv};
        height: 1.125rem;
    }
    animation: loading .4s linear infinite alternate;

    @keyframes loading {
        0%{
            & h4 {
                background-color: ${({theme}) => theme.onsurfv};
            }
        }
        100%{
            & h4 {
                background-color: ${({theme}) => theme.outline};
            }
        }
    }
`;
const ButtonSkeleton = styled.div`
    padding: 1rem;
    background-color: ${({theme}) => theme.primary};
    width: 5rem;
    height: 1.125rem;
    border-radius: .25rem;
    @media screen and (min-width: 0px) and (max-width: 480px) {padding: .5rem 1rem;}
`;
export const SkeletonPlans = () => {
    return <>
        <h3>Cargando planes</h3>
        <Plan><h4> </h4><ButtonSkeleton /></Plan>
        <Plan><h4> </h4><ButtonSkeleton /></Plan>
        <Plan><h4> </h4><ButtonSkeleton /></Plan>
        <Plan><h4> </h4><ButtonSkeleton /></Plan>
    </>
}