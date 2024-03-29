import { useState, useEffect, useMemo } from 'react';
import { documentCRUD } from '../firebase.crud';

const useDocument = (path, id) => {
    const crud = useMemo(() => documentCRUD(path, id), [path, id])
    const [document, setData] = useState([]);
    const [loadingDoc, setLoadingDoc] = useState(false)
    const [errorDoc, setErrorDoc] = useState(crud.error)

    useEffect(() => {
        const fetchCollection = async () => {
            const fetchedData = await crud.read().catch((error)=>{
                setErrorDoc(error.message)
            });
            setData(fetchedData);
            setLoadingDoc(false)
        };
        fetchCollection();
    },[]);

    const getDocument = async() =>{
        const fetchedData = await crud.read().catch((error)=>{
            setErrorDoc(error.message)
        });
        setData(fetchedData);
    }
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