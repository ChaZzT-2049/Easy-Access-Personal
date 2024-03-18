import styled from "styled-components";
import { Plan, Plans } from "../../UI";
const ButtonSkeleton = styled.p`
    margin: 0 auto;
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
            <Plans>
                <Plan className="skeleton">
                <h4> </h4> 
                <ul className="selector">
                    <li className="selected"></li>
                    <li></li>
                </ul>
                <h2> </h2> <hr />
                <ul className="features">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ButtonSkeleton />
            </Plan>
            <Plan className="skeleton">
                <h4> </h4> 
                <ul className="selector">
                    <li className="selected"></li>
                    <li></li>
                </ul>
                <h2> </h2><hr />
                <ul className="features">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ButtonSkeleton />
            </Plan>
            <Plan className="skeleton">
                <h4> </h4> 
                <ul className="selector">
                    <li className="selected"></li>
                    <li></li>
                </ul>
                <h2> </h2><hr />
                <ul className="features">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ButtonSkeleton />
            </Plan>
            <Plan className="skeleton">
                <h4> </h4> 
                <ul className="selector">
                    <li className="selected"></li>
                    <li></li>
                </ul>
                <h2> </h2><hr />
                <ul className="features">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ButtonSkeleton />
            </Plan>
        </Plans>
    </>
}