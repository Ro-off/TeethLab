import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

export function useClients() {
  //   const clientsCollectionRef = collection(db, "clients");

  async function getClientById(id: string) {
    const clientRef = doc(db, "clients", id);

    const clientDoc = await getDoc(clientRef);
    console.log(clientDoc.data());
    return clientDoc.data();
  }
  return { getClientById };
}
