import { useState, useEffect, useMemo } from 'react';
import { collectionCRUD } from '../firebase.crud';

const useCollection = (path, options) => {
    const crud = useMemo(() => collectionCRUD(path, options), [path, options]);
    const [collection, setData] = useState([]);
    const [loadingColl, setLoadingColl] = useState(true)
    const [errorColl, setErrorColl] = useState("")

    useEffect(() => {
        const fetchCollection = async () => {
            const crudEffect = documentCRUD(path, id)
            const fetchedData = await crudEffect.read();
            setData(fetchedData);
            setLoadingColl(false)
        };
        fetchCollection();
    },[]);

    const getCollection = async() =>{
        const fetchedData = await crud.read();
        setData(fetchedData);
    }

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