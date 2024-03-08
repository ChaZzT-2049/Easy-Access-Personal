import { setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLayoutEffect, useState } from "react";

const useDoc = (collection, id) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const ref = id ? doc(db, collection, id) : null
    const get = async() => {
        const snap = await getDoc(ref)
        setData(snap.data())
    }
    useLayoutEffect(()=>{
        const ref = id ? doc(db, collection, id) : null
        if(ref){
            const fetchDoc = async() =>{
                try {
                    const snap = await getDoc(ref)
                    setData(snap.data())
                } catch (error) {
                    setError(error)
                }
                setLoading(false)
            }
            fetchDoc()
        }
    },[collection, id])

    const set = async (data) => {
        if(ref){
            await setDoc(ref, data);
            get()
        }
    };

    const deleteD = async () => {
        await deleteDoc(ref);
        get()
    };

    return {
        data,
        loading,
        error,
        set,
        deleteD,
    };
};

export default useDoc;