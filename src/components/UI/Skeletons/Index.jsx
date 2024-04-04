import styled from "styled-components";
import { Instalation, Instalations, Plan, Plans, SuscriptionInfo, BaseBtn } from "../../../styled/index";
const SkeletonBtn = styled(BaseBtn)`
    width: 5rem;
    height: 1rem;
    padding: 1rem;
    &:hover{background: none; outline: none;}
    &.only-icon{width: 24px; height: 24px; padding: 1rem;}
`;
const SkeletonUsers = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    margin: 1rem 0;
    & li{
        position: relative;
        padding: 1rem;
        background: ${({theme})=>theme.surfacev};
        border-radius: .25rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        & img{
            border-radius: 50%;
            width: 50px;
            height: 50px;
            background: ${({theme})=>theme.outline};
        }
        & div{
            padding-left: 1rem;
            border-left: 2px solid ${({theme})=>theme.primary};
            & h4, & span, & small{
                background: ${({theme})=>theme.outline};
            }
            & h4{width: 8rem; height: 1.25rem; margin-bottom: .25rem;}
            & span{width: 5rem; height: 1rem; display: inline-flex;}
            & small{width: 4rem; height: .75rem; display: inline-flex;}
        }
        & button{
            align-self: flex-start;
        }
    }
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
export const SkeletonInscriptions = () => {
    const User = () => {
        return <li>
            <img src="" alt="" />
            <div>
                <h4> </h4>
                <span> </span><br />
                <small> </small>
            </div> 
            <SkeletonBtn className="only-icon primary oncont"/>
        </li>
    }
    return <SkeletonUsers className="skeleton">
        <User/><User/><User/><User/>
    </SkeletonUsers>
}