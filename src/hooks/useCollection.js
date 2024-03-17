import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, onSnapshot, doc, addDoc, setDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';
const useCollection = (path, order, fwhere) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = collection(db, path);
  useEffect(() => {
    const r = collection(db, path);
    let q = null
    const fetchCollection = async () => {
      setLoading(true);
      setError(null);
      if (order) {
        const [field, direction] = order.split(':');
        q = query(r, orderBy(field, direction));
      }
      if (fwhere) {
        const [field, operator, value] = fwhere.split(':');
        q = query(r, where(field, operator, value));
      }
      try {
        const snap = await getDocs(q || r);
        const fetchedData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(fetchedData);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchCollection();
    const unsubscribe = onSnapshot(q || r, (snapshot) => {
      const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(fetchedData);
    });
    return () => unsubscribe();
  }, [path, order, fwhere]);

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