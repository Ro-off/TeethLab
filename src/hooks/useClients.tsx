import { db } from "../firebase";
import { getDoc, getDocs, doc, collection, query } from "firebase/firestore";
import { useCallback } from "react";

export function useClients() {
  const getClientById = useCallback(async (id: string) => {
    const clientRef = doc(db, "clients", id);
    const clientDoc = await getDoc(clientRef);
    return clientDoc.data();
  }, []);

  const getAllClients = useCallback(async () => {
    const clientCollectionRef = collection(db, "clients");
    const querySnapshot = await getDocs(query(clientCollectionRef));
    const docArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      label: doc.data().name,
      value: doc.id,
    }));
    return docArray;
  }, []);

  return { getClientById, getAllClients };
}
