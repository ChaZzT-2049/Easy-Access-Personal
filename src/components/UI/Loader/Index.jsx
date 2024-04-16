import styled from "styled-components";
import { useRef, useLayoutEffect } from "react";
import useAppContext from "../../../hooks/app/useAppContext";

const Loading = styled.dialog`
    background: ${({theme}) => theme.onprimarycont};
    color: ${({theme}) => theme.primarycont};
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: .5rem;
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
    & h4{
        text-align: center;
    }
`;
const Spinner = styled.section`
    border: 10px solid currentColor;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border-top-color: ${({theme}) => theme.secondary};
    animation: spin 1s ease-in-out infinite;
    @keyframes spin {
        from{
            rotate: 0deg;
        }
        to{
            rotate: 360deg;
        }
    }
`;

const Loader = ({message}) => {
    const loaderRef = useRef(null)

    useLayoutEffect(() => {
        const handleLoad = () =>{
            message.length > 0 ? loaderRef.current.showModal() : loaderRef.current.close();
            loaderRef.current.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                  event.preventDefault();
                }
            });
        }
        handleLoad();
        loaderRef.current.removeEventListener("keydown", handleLoad)
    },[message])
    return <Loading ref={loaderRef} >
        <Spinner />
        <h4>{message}</h4>
    </Loading>
}

export default Loader;