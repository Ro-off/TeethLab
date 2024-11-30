import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

export function useTechnicians() {
  //   const clientsCollectionRef = collection(db, "clients");

  async function getTechnicianById(id: string) {
    const techniciansRef = doc(db, "technicians", id);

    const technicianDoc = await getDoc(techniciansRef);
    console.log(technicianDoc.data());
    return technicianDoc.data();
  }
  return { getTechnicianById };
}
