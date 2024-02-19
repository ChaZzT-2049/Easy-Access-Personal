import { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { FlexColum } from "../../UI";

const CarrouselContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin: 0 auto;
`;
const Carrousel = styled.ul`
    ${props => "width: "+props.length+"%"};
    display: flex;
    flex-flow: row nowrap;
    /* ${props => "transform: translateX("+props.translate+"%);"}; */
    transition: transform 500ms ease;
`;
const Slide = styled.li`
    width: calc(100% / ${props => props.length});
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
    const [translate, setTranslate] = useState("")
    const [control, setControl] = useState(0)
    const carrouselRef = useRef(null)
    useLayoutEffect(()=>{
        const handleSlide = () =>{
            carrouselRef.current.style.transform = `translateX(${translate}%)`
        }
        handleSlide()
    },[translate])
    return <CarrouselContainer>
        <Carrousel ref={carrouselRef} length={datos.length * 100}>
            {datos.map(dato => 
                <Slide key={dato.id} length={datos.length}>
                    <div className="img">
                        <img src={dato.img} alt={dato.titulo} />
                    </div>
                    <FlexColum className="text">
                        <h2>{dato.titulo}</h2>
                        <p>{dato.descripcion}</p>
                    </FlexColum>
                </Slide>
            )}
        </Carrousel>
        <CarrouselControls>
            {datos.map((dato, i) => 
                <li className={i === control ? "active" : ""} onClick={() => {
                    const calc = i * -(100 / datos.length);
                    setTranslate(`${calc}`)
                    setControl(i)
                }} key={i}>{dato.id}</li>
            )}
        </CarrouselControls>
    </CarrouselContainer>
}

export default Slider