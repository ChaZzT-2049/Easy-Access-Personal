import { useState, useMemo, useEffect, useCallback } from 'react';
import { collectionCRUD } from '../firebase.crud';

const useCollection = (path, options) => {
    const crud = useMemo(() => collectionCRUD(path, options), [path, options]);
    const [collection, setCollection] = useState(null);
    const [loadingColl, setLoadingColl] = useState(true)
    const [errorColl, setErrorColl] = useState("")

    const getCollection = useCallback(async() =>{
        setLoadingColl(true)
        const fetchedData = await crud.read().catch((error)=>{
            setErrorColl(error.message)
        }).finally(()=>{
            setLoadingColl(false)
        });
        setCollection(fetchedData);
    },[crud])
    useEffect(()=>{
        if(collection === null){
            getCollection()
        }
    },[collection, getCollection])
    const createCollDoc = async(newData) => {
        return crud.create(newData).then(()=>{
            getCollection()
        }).catch((error)=>{
            setErrorColl(error.message)
        });
    };
    
    const updateCollDoc = async (id, newData) => {
        return crud.update(id, newData).then(()=>{
            getCollection()
        }).catch((error)=>{
            setErrorColl(error.message)
        });
    };
    
    const deleteCollDoc = async (id) => {
        return crud.destroy(id).then(()=>{
            getCollection()
        }).catch((error)=>{
            setErrorColl(error.message)
        });
    };
    return {
        collection,
        loadingColl,
        errorColl,
        createCollDoc,
        updateCollDoc,
        deleteCollDoc
    }
}
export default useCollection