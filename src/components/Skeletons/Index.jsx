import styled from "styled-components";

const Plan = styled.div`
    background-color: ${({theme}) => theme.surfacev};
    padding: 1rem;
    & h4{
        background-color: ${({theme}) => theme.onsurfv};
        padding: .75rem;
    }
`;
const ButtonSkeleton = styled.div`
    padding: .25rem;
    background-color: ${({theme}) => theme.primary};
    width: 5rem;
    height: 2rem;
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