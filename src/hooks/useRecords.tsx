import { db } from "../firebase";
import {
  getDocs,
  getDoc, // Add this import
  collection,
  query,
  limit,
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

  async function getRecords(lastItemId: string | null, recordsLimit: number) {
    // Start with basic query constraints
    const queryConstraints = [];

    // Add filters based on what's selected
    if (searchRequest.client) {
      queryConstraints.push(
        where("client_ref", "==", doc(db, "clients", searchRequest.client))
      );
    } else if (searchRequest.technician) {
      queryConstraints.push(
        where(
          "technican_ref",
          "==",
          doc(db, "technicians", searchRequest.technician)
        )
      );
    } else if (searchRequest.patient) {
      queryConstraints.push(
        where("patient_id", "==", Number(searchRequest.patient))
      );
    }

    // Add date range last
    if (searchRequest.dateRange?.start && searchRequest.dateRange?.end) {
      const startDate = getTimestampFromDate(
        searchRequest.dateRange.start.toDate("UTC")
      );
      const endDate = getTimestampFromDate(
        searchRequest.dateRange.end.toDate("UTC")
      );
      queryConstraints.push(
        where("date.seconds", ">=", startDate),
        where("date.seconds", "<=", endDate)
      );
    }

    // Add ordering after all filters
    queryConstraints.push(orderBy("date.seconds", "desc"));

    // Add limit and pagination last
    queryConstraints.push(limit(recordsLimit + 1));

    if (lastItemId) {
      // const lastDocRef = doc(db, "jobs", lastItemId);
      // const lastDocSnap = await getDoc(lastDocRef);
      // if (lastDocSnap.exists()) {
      //   queryConstraints.push(startAfter(lastDocSnap));
      // }
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

    return {
      results,
      hasMore: records.length > recordsLimit,
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
      date: {
        seconds: getTimestampFromDate(
          record.date ? new Date(record.date) : new Date()
        ),
      },
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
