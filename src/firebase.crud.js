import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { db } from "./firebase";

export const collectionCRUD = (path, options) => {
    const ref = collection(db, path);
    let q = ref
    if (options && options.whereParams) {
        const { wField, op, value } = options.whereParams;
        q = query(q, where(wField, op, value));
    }
    if (options && options.orderParams) {
        const { oField, direction } = options.orderParams;
        q = query(q, orderBy(oField, direction || 'asc'));
    }

    const create = (newData) => {
        return addDoc(ref, newData)
    };
    const read = async () => {
        let fetchedData
        await getDocs(q).then((snap)=>{
            fetchedData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        })
        return fetchedData
    };
    const update = (id, newData) => {
        return setDoc(doc(ref, id), newData)
    };
    const destroy = (id) => {
        return deleteDoc(doc(ref, id))
    };
    return {
        create, read, update, destroy
    }
}
export const documentCRUD = (path, id) => {
    if(!id){
        return {error: "Id del documento no proporcionada"}
    }
    const ref = doc(db, path, id)

    const read = async () => {
        let fetchedData
        await getDoc(ref).then((snap)=>{
            fetchedData = snap.data()
        })
        return fetchedData
    };
    const update = (newData) => {
        return setDoc(ref, newData);
    };
    const destroy = () => {
        return deleteDoc(ref)
    };
    return {
        read, update, destroy
    }

}