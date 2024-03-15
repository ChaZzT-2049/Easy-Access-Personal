import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        font-size: 16px;
        font-family: 'Lato', sans-serif;
        cursor: default;
    }
    i{
        outline-width: 1px;
        cursor: pointer;
        border-radius: .25rem;
        transition: all 100ms linear;
    }
    h1 { font-size: 2rem; } 
    h2 { font-size: 1.5rem; } 
    h3 { font-size: 1.25rem; }
    h4 { font-size: 1.125rem; } 
    h5 { font-size: .83rem; } 
    h6 { font-size: .75rem; }
    b{font-weight: 700;}
    small{ font-size: .80rem; }
    html{
        min-height: 100%;
    }
    body{
        min-height: 100%;
        box-sizing: border-box;
        transition: all 200ms ease-in;
    }
    #root{
        min-height: 100%;
    }
    a{color:inherit}
    button{
        border: none;
        font-size: 1rem;
        cursor: pointer;
        background: none;
    }
`;

export default GlobalStyle;