import { useState, useMemo, useEffect, useCallback } from 'react';
import { collectionCRUD } from '../firebase.crud';
import { onSnapshot } from 'firebase/firestore';

const useCollection = (path, options, realTime = false) => {
    const crud = useMemo(() => collectionCRUD(path, options), [path, options]);
    const [collData, setCollData] = useState(null);
    const [loadingColl, setLoadingColl] = useState(true)
    const [errorColl, setErrorColl] = useState("")

    const getCollection = useCallback(async() =>{
        setLoadingColl(true)
        const fetchedData = await crud.read().catch((error)=>{
            setErrorColl(error)
        }).finally(()=>{
            setLoadingColl(false)
        });
        setCollData(fetchedData);
    },[crud])

    useEffect(()=>{
        if(collData === null){
            getCollection()
        }
    },[collData, getCollection])

    useEffect(() => {
        if (realTime) {
            const query = crud.getQuery();
            const unsubscribe = onSnapshot(query, (snapshot) => {
                const updatedCollection = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCollData(updatedCollection);
            });

            return () => unsubscribe();
        }
    }, [realTime, crud]);

    const createCollDoc = async(newData) => {
        return crud.create(newData).then(()=>{
            if(!realTime){getCollection()}
        }).catch((error)=>{
            setErrorColl(error)
        });
    };
    
    const updateCollDoc = async (id, newData) => {
        return crud.update(id, newData).then(()=>{
            if(!realTime){getCollection()}
        }).catch((error)=>{
            setErrorColl(error)
        });
    };
    
    const deleteCollDoc = async (id) => {
        return crud.destroy(id).then(()=>{
            if(!realTime){getCollection()}
        }).catch((error)=>{
            setErrorColl(error)
        });
    };
    return {
        collData,
        loadingColl,
        errorColl,
        createCollDoc,
        updateCollDoc,
        deleteCollDoc
    }
}
export default useCollection