import { useState, useMemo, useEffect, useCallback } from 'react';
import { documentCRUD } from '../firebase.crud';

const useDocument = (path, id) => {
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

    useEffect(()=>{
        if(document === null){
            getDocument()
        }
    },[document, getDocument])
    const updateDoc = async (newData) => {
        return crud.update(newData).then(()=>{
            getDocument()
        }).catch((error)=>{
            setErrorDoc(error.message)
        });
    };
    
    const deleteDoc = async () => {
        return crud.destroy().then(()=>{
            getDocument()
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