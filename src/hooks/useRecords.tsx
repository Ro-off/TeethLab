import { db } from "../firebase";
import {
  getDocs,
  collection,
  query,
  limit,
  startAfter,
  orderBy,
  addDoc,
  doc,
  where,
} from "firebase/firestore";

import { useClients } from "./useClients";
import { useTechnicians } from "./useTechnicians";
import { useSearchRequest } from "./useSearchRequest";

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
  const { searchRequest } = useSearchRequest();

  async function getRecords(
    itemToStart: RecordItem | null,
    recordsLimit: number
  ) {
    const queryConstraints = [
      limit(recordsLimit + 1),
      ...buildWhereClause("client_ref", searchRequest.client, (id) =>
        doc(db, `clients/${id}`)
      ),
      ...buildWhereClause("patient_id", searchRequest.patient, Number),
      ...buildWhereClause("technican_ref", searchRequest.technician, (id) =>
        doc(db, `technicians/${id}`)
      ),
    ];

    function buildWhereClause(
      field: string,
      value: string | null,
      transform: (val: string) => any
    ) {
      return value ? [where(field, "==", transform(value))] : [];
    }

    const data = await getDocs(
      query(recordsCollectionRef, ...queryConstraints)
    );

    console.log(searchRequest);

    // const timestamp = Date.now();
    const recordPromises = data.docs.map(async (doc) => {
      const docData = doc.data();
      const clientDoc = await getClientById(docData.client_ref.id);
      const technicianDoc = await getTechnicianById(docData.technican_ref.id);

      return {
        id: doc.id,
        client: clientDoc?.name || null,
        patient: clientDoc?.patients[docData.patient_id] || null,
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
      client_ref: doc(db, "clients/" + record.client),
      technican_ref: doc(db, "technicians/" + record.technician),
      description: record.comments,
      patient_id: Number(record.patient),
      price_UAH: record.priceUah,
      price_USD: record.priceUsd,
      procedure: "test", //todo: add procedure
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
