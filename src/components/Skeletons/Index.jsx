import styled from "styled-components";
import { Instalation, Instalations, Plan, Plans, SuscriptionInfo, BaseBtn } from "../../UI";
const SkeletonBtn = styled(BaseBtn)`
    width: 5rem;
    height: 1rem;
    padding: 1rem;
    &:hover{background: none; outline: none;}
    &.only-icon{width: 24px; height: 24px; padding: 1rem;}
`;
export const SkeletonPlans = () => {
    const SkeletonPlan = () => {
        return <Plan className="skeleton">
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
            <SkeletonBtn className="primary" />
        </Plan>
    }
    return <>
        <h3>Cargando planes</h3>
        <Plans className="skeleton">
            <SkeletonPlan />
            <SkeletonPlan />
            <SkeletonPlan />
            <SkeletonPlan />
        </Plans>
    </>
}

export const SkeletonSuscription = () => {
    return <SuscriptionInfo className="skeleton">
        <h3> </h3>
        <p> </p>
        <SkeletonBtn className="primary oncont" />
    </SuscriptionInfo>
}
export const SkeletonInstalations = () => {
    const SkeletonInst = () => {
        return <Instalation className="skeleton">
            <div>
                <h4> </h4>
                <p> </p>
                <div className="actions">
                    <SkeletonBtn className="primary icon" />
                </div>
            </div>
            <i className="material-icons icon"></i>
        </Instalation>
    }
    return <Instalations className="skeleton">
        <div className="content">
            <ul>
                <SkeletonInst/>
                <SkeletonInst/>
                <SkeletonInst/>
                <SkeletonInst/>
            </ul>
        </div>
    </Instalations>
}