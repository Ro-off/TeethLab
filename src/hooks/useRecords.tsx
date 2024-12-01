import { db } from "../firebase";
import {
  getDocs,
  collection,
  query,
  limit,
  startAfter,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { useClients } from "./useClients";
import { useTechnicians } from "./useTechnicians";

//todo: move to separate hook
function conventTimestampToDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

function getTimestampFromDate(date: Date) {
  return new Date(date).getTime() / 1000;
}

const recordsCollectionRef = collection(db, "jobs");
export function useRecords() {
  const { getClientById } = useClients();
  const { getTechnicianById } = useTechnicians();

  async function getRecords(
    itemToStart: RecordItem | null,
    recordsLimit: number
  ) {
    const data = await getDocs(
      query(
        recordsCollectionRef,
        limit(recordsLimit + 1),
        orderBy("date"),
        startAfter(itemToStart)
      )
    );

    // const timestamp = Date.now();
    const recordPromises = data.docs.map(async (doc) => {
      const docData = doc.data();
      const clientDoc = await getClientById(docData.client_ref.id);
      const technicianDoc = await getTechnicianById(docData.technican_ref.id);

      return {
        // ...docData, //!remove after test
        id: doc.id,
        client: clientDoc?.name || null,
        patient: clientDoc?.pattients[docData.patient_id] || null,
        technician: technicianDoc?.name || null,
        date: conventTimestampToDate(docData.date.seconds),
        comments: docData.description || null,
        priceUah: docData.price_UAH,
        priceUsd: docData.price_USD,
      } as RecordItem;
    });

    const records = await Promise.all(recordPromises);

    const results = records.slice(0, recordsLimit);
    const next = records[recordsLimit];
    console.log(data.docs);
    return {
      count: 2,
      previous: itemToStart,
      next: next ? next : null,
      results,
    };
  }

  async function createRecord(record: RecordItem) {
    const serverRecord = {
      ...record,
      //todo: change date format in firebase
      date: { seconds: getTimestampFromDate(record.date) },
      comments: record.comments ? record.comments : "",
    };
    console.log(serverRecord);
    await addDoc(recordsCollectionRef, serverRecord);
  }

  return { getRecords, createRecord };
}

export interface RecordItem {
  id?: string | null;
  client: string | null;
  patient: string | null;
  technician: string | null;
  date: string | null;
  comments: string | null;
  priceUah: number | null;
  priceUsd: number | null;
}
