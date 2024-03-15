import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, onSnapshot, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';
const useCollection = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = collection(db, path);
  useEffect(() => {
    const ref = collection(db, path);
    const fetchCollection = async () => {
      setLoading(true);
      setError(null);
      const snap = await getDocs(ref).catch((error) => {
        setError(error.message)
      });
      const fetchedData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(fetchedData);
      setLoading(false);
    };
    fetchCollection();
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(fetchedData);
    });
    return () => unsubscribe();
  }, [path]);
  const docAdd = async (newData) => {
    await addDoc(ref, newData).catch((error) => {
      setError(error.message)
    })
  };
  const updateDoc = async (id, newData) => {
    await setDoc(doc(db, path, id), newData).catch((error) => {
      setError(error.message)
    })
  };
  const docDelete = async (id) => {
    await deleteDoc(doc(db, path, id)).catch((error) => {
      setError(error.message)
    })
  };
  return [ 
    data, loading, error, 
    docAdd, updateDoc, docDelete 
  ];
};

export default useCollection;