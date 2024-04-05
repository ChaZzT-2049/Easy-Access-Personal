import styled from "styled-components";

const Loader = styled.div`
    color: ${({theme}) => theme.primarycont};
    width: 92.5vw;
    height: 100%;
    margin: 0 auto;
    max-height: 650px;
    position: absolute;
    z-index: 1;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fade 1.5s linear infinite;
    @keyframes fade {
        from{
            background: ${({theme}) => theme.outline};
        }
        to{
            background: ${({theme}) => theme.onsurfv};
        }
    }
`;
const Spinner = styled.div`
    border: 4px solid currentColor;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border-left-color: ${({theme}) => theme.onprimarycont};
    animation: spin 1s linear infinite;

    @keyframes spin {
        from{
            rotate: 0deg;
        }
        to{
            rotate: 360deg;
        }
    }
`;
const SecondaryLoader = ({children}) => {
    return <Loader>
        <Spinner />
        <h2>{children || "Cargando"}</h2>
    </Loader>
}
export default SecondaryLoader
