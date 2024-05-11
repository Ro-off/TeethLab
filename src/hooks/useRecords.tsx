import { db } from "../firebase";
import {
  getDocs,
  collection,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";

export function useRecords() {
  async function getRecords(
    itemToStart: RecordItem | null,
    recordsLimit: number
  ) {
    const data = await getDocs(
      query(
        collection(db, "jobs"),
        limit(recordsLimit + 1),
        orderBy("date"),
        startAfter(itemToStart)
      )
    );
    const records = data.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as RecordItem)
    ); // Cast the DocumentData objects to RecordItem objects
    const results = records.slice(0, recordsLimit);
    const next = records[recordsLimit];

    return {
      count: 2,
      previous: itemToStart,
      next: next ? next : null,
      results,
    };
    // return results;
  }

  return getRecords;
}

export interface RecordItem {
  id: string;
  client: string;
  patient: string;
  technician: string;
  createdAt: string;
  status: string;
  type: string;
  dueDate: string;
  completedDate: string;
  notes: string;
  attachments: string[];
}
