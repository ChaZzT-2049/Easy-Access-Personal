import { QrScanner } from "react-qrcode-scanner";
import Btn from "../../../../components/UI/Button/Index";
import { PageTitle } from "../../../../styled";
import { useState } from "react";
import styled, {useTheme} from "styled-components"
import {useParams} from "react-router-dom"
import useAppContext from "../../../../hooks/app/useAppContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
const ScannerWrapper = styled.section`
    box-sizing: border-box;
    position: relative;
    & button{
        position: absolute;
        top: 0;
        left: 50%;
        margin-top: 1rem;
        translate: -50%;
        z-index: 1;
    }
    @media screen and (min-width: 0px) and (max-width: 480px) {
        height: 70vh;
        & div{
            height: 100%;
            max-height: 60vh;
        }
    }
    
`;
const AccessScanner = () => {
    const {appLoader} = useAppContext()
    const {id} = useParams()
    const colors = useTheme()
    const [cam, setCam] = useState("environment")
    const validateAccess = async(value) => {
        appLoader.custom("Validando QR")
        let inscription
        const q = query(collection(db, "inscriptions"), where("instID", "==", id), where("userID", "==", value))
        await getDocs(q).then((snapshot)=>{
            const results = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            inscription = results[0]
        })
        if(inscription){
            console.log(inscription)
        }else{
            console.log("No tiene inscripcion")
        }
        appLoader.clearLoader()
    }
    return <>
        <PageTitle>Escanear Codigo QR</PageTitle>
        <ScannerWrapper>
            <Btn colors="primary cont" type="icon" icon="camera" action={cam === "environment" ? "Trasera" : "Frontal"} onClick={()=>{
                setCam((e)=> e === "environment" ? "face" : "environment")
            }} />
            <QrScanner 
            resolution={800} 
            delay={3000} 
            facingMode={cam}
            onScan={(value) => validateAccess(value)} 
            onError={(error)=>{console.log(error)}}
            viewFinder={{
                border: `.5rem dashed ${colors.primary}`,
                position: 'absolute',
                borderRadius: '.5rem',
                width: '50%',
                maxWidth: '300px',
                height: '250px'
            }} />
        </ScannerWrapper>
        
    </>
}
export default AccessScanner;