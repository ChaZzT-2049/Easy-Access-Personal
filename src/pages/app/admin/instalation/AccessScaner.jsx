import { QrScanner } from "react-qrcode-scanner";
import Btn from "../../../../components/UI/Button/Index";
import { PageTitle } from "../../../../styled";
import { useState } from "react";
import styled, {useTheme} from "styled-components"
import {useParams, useNavigate} from "react-router-dom"
import useAppContext from "../../../../hooks/app/useAppContext";
import { addDoc, collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import useInstalationContext from "../../../../hooks/app/useInstalationContext";
const ScannerWrapper = styled.section`
    box-sizing: border-box;
    position: relative;
    & section{
        width: 80%;
        position: absolute;
        top: 0;
        left: 50%;
        margin-top: 1rem;
        translate: -50%;
        z-index: 1;
        display: flex;
        justify-content: space-between;
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
    const navigate = useNavigate()
    const {appLoader, appToast} = useAppContext()
    const {instalation} = useInstalationContext()
    const {id, point} = useParams()
    const colors = useTheme()
    const [cam, setCam] = useState("environment")
    const [accessType, setAccessType] = useState("Entrada")
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
        if(inscription && inscription.active){
            const newAccess = {
                userDisplay: inscription.userDisplay,
                pointDisplay: inscription.instDisplay,
                date: serverTimestamp(),
                type: accessType,
                userID: inscription.userID,
                instID: id,
                pointID: point,
            }
            addDoc(collection(db, "records"),newAccess).then(()=>{
                appToast.success("Registro exitoso", `Se ha registrado la ${accessType.toLowerCase()}`)
                setDoc(doc(db, "instalations", id), {points: instalation?.records + 1}, {merge: true})
            }).catch((e)=>{appToast.error("Hubo algún error.", e.message)})
        }else{
            appToast.warning("Acceso no Autorizado", "El usuario no tiene permitido acceder a la instalación")
        }
        appLoader.clearLoader()
    }
    return <>
        <PageTitle>Escanear Codigo QR</PageTitle>
        <ScannerWrapper>
            <section>
                <Btn colors="primary cont" type="icon inverted" icon="arrow_back" action="Volver" onClick={()=>{
                    navigate(`/admin/instalation/${id}/access-points`)
                }}/>
                <Btn colors={accessType === "Entrada" ? "success" : "danger"} type="icon" 
                    icon={accessType === "Entrada" ? "login" : "logout"} 
                    action={accessType} 
                    onClick={()=>{
                        setAccessType((e)=> e === "Entrada" ? "Salida" : "Entrada")
                    }} 
                />
                <Btn colors="primary" type="icon" icon="camera" action={cam === "environment" ? "Trasera" : "Frontal"} onClick={()=>{
                    setCam((e)=> e === "environment" ? "face" : "environment")
                }} />
            </section>
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