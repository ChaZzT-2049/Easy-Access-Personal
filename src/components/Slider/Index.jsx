import { useState, useRef } from "react";
import styled from "styled-components";

const CarrouselContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin: 0 auto;

    & ul.slider{
        width: ${props => props.$length * 100}%;
        display: flex;
        flex-flow: row nowrap;
        transition: transform 500ms ease;
        & li{
            width: calc(100% / ${props => props.$length});
            display: flex;
            flex-wrap: wrap;
            background: ${({theme}) => theme.surfacev};
            & div.img{
                flex: 1 1 350px;
                height: 50vh;
                & img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                }
            }
            & div.text{
                display: flex;
                flex-direction: column;
                flex: 1 1 350px;
                box-sizing: border-box;
                padding: 1rem;
                justify-content: center;
                gap: 1rem;
                &h2{font-weight: 300;}
            }
            &:nth-child(2), &:nth-child(4){
                flex-direction: row-reverse;
                background: ${({theme}) => theme.primary};
                color: ${({theme}) => theme.onprimary};
            }
            @media screen and (min-width: 0px) and (max-width: 480px) {
                & div.img {
                    height: 30vh;
                }
            }
        }
    }
`;
const CarrouselControls = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    padding: 1rem;
    & li{
        background: ${({theme}) => theme.primarycont};
        color: ${({theme}) => theme.onprimarycont};
        height: 1rem;
        width: 1rem;
        padding: .5rem;
        border-radius: 100%;
        text-align: center;
        cursor: pointer;
        transition: all 100ms linear;
        &.active{
            background: ${({theme}) => theme.primary};
            color: ${({theme}) => theme.onprimary}; 
        }
    }
`;

const Slider = ({datos}) => {
    const [control, setControl] = useState(0)
    const carrouselRef = useRef(null)

    const handleSlide = (translate) =>{
        carrouselRef.current.style.transform = `translateX(${translate}%)`
    }
    return <CarrouselContainer $length={datos.length}>
        <ul className="slider" ref={carrouselRef}>
            {datos.map(dato => 
                <li key={dato.id}>
                    <div className="img">
                        <img src={dato.img} alt={dato.titulo} />
                    </div>
                    <div className="text">
                        <h2>{dato.titulo}</h2>
                        <p>{dato.descripcion}</p>
                    </div>
                </li>
            )}
        </ul>
        <CarrouselControls>
            {datos.map((dato, i) => 
                <li className={i === control ? "active" : ""} 
                    onClick={() => {
                        const calc = i * -(100 / datos.length);
                        setControl(i)
                        handleSlide(calc)
                    }} key={dato.id}
                ></li>
            )}
        </CarrouselControls>
    </CarrouselContainer>
}

export default Slider