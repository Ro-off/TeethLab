import { db } from "../firebase";
import { getDoc, doc, query, getDocs, collection } from "firebase/firestore";
import { useCallback } from "react";

export function useTechnicians() {
  console.log("sended request");
  const getTechnicianById = useCallback(async (id: string) => {
    const techniciansRef = doc(db, "technicians", id);
    const technicianDoc = await getDoc(techniciansRef);
    return technicianDoc.data();
  }, []);

  const getAllTechnicians = useCallback(async () => {
    console.log("sended request - getAllTechnicians");
    const technicianCollectionRef = collection(db, "technicians");
    const querySnapshot = await getDocs(query(technicianCollectionRef));
    const docArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      label: doc.data().name,
      value: doc.id,
    }));
    return docArray;
  }, []);

  return { getTechnicianById, getAllTechnicians };
}
