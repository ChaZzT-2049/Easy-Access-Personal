import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { db } from "./firebase";

const collectionSuspender = (q, ref) => {
    let response;
    let fetchedData;
    const create = async(newData) => {
        await addDoc(ref, newData)
        return read()
    }

    const read = () => {
        const snapshot = getDocs(q)
        snapshot.then((snap) => {
            fetchedData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            response = {data: fetchedData, error: ""};
        }).catch((error) => {
            response = {data: [], error: error.message}
        })
        return response
    }

    const update = async(id, newData) => {
        await setDoc(doc(ref, id), newData)
        return read()
    }

    const destroy = (id) => {
        return deleteDoc(doc(ref, id))
    }


    return {create, read, update, destroy}
}
export const crudCollection = (path, options) => {
    let ref  = collection(db, path);
    let q = ref
    if (options && options.whereParams) {
        const { wField, op, value } = options.whereParams;
        q = query(ref, where(wField, op, value));
    }
    if (options && options.orderParams) {
        const { oField, direction } = options.orderParams;
        q = query(q, orderBy(oField, direction || 'asc'));
    }
    return collectionSuspender(q, ref);
}

const docSuspender = (ref) => {
    let response

    const read = () => {
        if(ref){
            const snapshot = getDoc(ref)
            snapshot.then((snap) => {
                response = {data: snap.data(), error: ""};
            }).catch((error) => {
                response = {data: [], error: error.message}
            })
            
        }
        return response
    }
    const update = async (data) => {
        await setDoc(ref, data);
        return read();
    }
    const destroy = () => {
        return deleteDoc(ref)
    }
    return { read, update, destroy}
}
export const crudDoc = (path, id) =>{
    let ref
    if(id){
        ref = doc(db, path, id)
    }
    return docSuspender(ref)
}