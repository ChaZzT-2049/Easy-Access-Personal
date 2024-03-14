import { setDoc, doc, getDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useLayoutEffect, useState } from "react";

const useDoc = (collection, id) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const ref = id ? doc(db, collection, id) : null
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
            const unsubscribe = onSnapshot(ref, (snapshot) => {
                setData(snapshot.data());
            });
            return () => unsubscribe();
        }
    },[collection, id])

    const docUpdate = async (data) => {
        if(ref){
            await setDoc(ref, data);
        }
    };

    const docDelete = async () => {
        await deleteDoc(ref);
    };

    return {
        data,
        loading,
        error,
        docUpdate,
        docDelete,
    };
};

export default useDoc;