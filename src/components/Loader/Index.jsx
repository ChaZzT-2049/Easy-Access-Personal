import styled from "styled-components";
import { useRef, useLayoutEffect } from "react";
import useAppContext from "../../hooks/useAppContext";

const Loading = styled.dialog`
    background: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.onprimary};
    transition: all 100ms ease-in-out;
    border: none;
    outline: none;
    width: max-content;
    height: max-content;
    padding: 1rem;
    border-radius: .5rem;
    scale: .8;

    &[open]{
        scale: 1;
        opacity: 1;
        transition: all 100ms ease-in-out;
    }

    @starting-style {
        &[open] {
            opacity: 0;
            scale: .8;
            transition: all 100ms ease-in-out;
        }
    }
    &::backdrop{
        background: #00000000;
        transition: all 100ms ease-in-out;
        cursor: progress;
    }
    &[open]::backdrop{
        background: #0000007a;
        transition: all 100ms ease-in-out;
    }
    @starting-style {
        &[open]::backdrop{
            background: #00000000;
            transition: all 100ms ease-in-out;
        }
    }
    /* @media screen and (min-width: 0px) and (max-width: 480px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
    } */
`;
const Spinner = styled.section`
    display: block;
    position: relative;
    width: 4rem;
    height: 4rem;
    margin: 0 auto;
`;
const Spin = styled.div`
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 3rem;
    height: 3rem;
    margin: .5rem;
    border: .5rem solid ${({theme}) => theme.onprimary};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({theme}) => theme.onprimary} transparent transparent transparent;

    &:nth-child(1) {
        animation-delay: -0.45s;
    }
    &:nth-child(2) {
        animation-delay: -0.3s;
    }
    &:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
`;

const Loader = () => {
    const {loader} = useAppContext()
    const loaderRef = useRef(null)

    useLayoutEffect(() => {
        const handleLoad = () =>{
            loader.length > 0 ? loaderRef.current.showModal() : loaderRef.current.close();
            loaderRef.current.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                  event.preventDefault();
                }
            });
        }
        handleLoad();
        loaderRef.current.removeEventListener("keydown", handleLoad)
    },[loader])
    return <Loading ref={loaderRef} >
            <Spinner>
                <Spin/><Spin/><Spin/><Spin/>
            </Spinner>
            <h3>{loader}</h3>
    </Loading>
}

export default Loader;