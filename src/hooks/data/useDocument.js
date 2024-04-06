import { useState, useMemo, useEffect, useCallback } from 'react';
import { documentCRUD } from '../../firebase/firebase.crud';
import { onSnapshot } from 'firebase/firestore';

const useDocument = (path, id, realTime = false) => {
    const crud = useMemo(() => documentCRUD(path, id), [path, id])
    const [document, setDocument] = useState(null);
    const [loadingDoc, setLoadingDoc] = useState(false)
    const [errorDoc, setErrorDoc] = useState(crud.error)

    const getDocument = useCallback(async() =>{
        setLoadingDoc(true)
        const fetchedData = await crud.read().catch((error)=>{
            setErrorDoc(error.message)
        }).finally(()=>{
            setLoadingDoc(false)
        });
        setDocument(fetchedData);
    },[crud])
    const getRealtime = useCallback(()=>{
        const ref = crud.getRef()
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            setDocument(snapshot.data());
        });
        return () => unsubscribe();
    },[crud])
    useEffect(()=>{
        if(document === null){
            getDocument()
        }
    },[document, getDocument])
    useEffect(() => {
        if (realTime) {
            getRealtime()
        }
    }, [realTime, getRealtime]);
    const updateDoc = async (newData) => {
        return crud.update(newData).then(()=>{
            if(!realTime) {getDocument()}
        }).catch((error)=>{
            setErrorDoc(error.message)
        });
    };
    
    const deleteDoc = async () => {
        return crud.destroy().then(()=>{
            if(!realTime) {getDocument()}
        }).catch((error)=>{
            setErrorDoc(error.message)
        });
    };
    if(crud.error){
        return {
            errorDoc
        }
    }
    return {
        document,
        loadingDoc,
        errorDoc,
        updateDoc,
        deleteDoc
    }
}
export default useDocument