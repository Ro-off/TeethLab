import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";

export function useRecords(itemToStart: number, recordsLimit: number) {
  const [records, setRecords] = useState<RecordItem[]>([]); // Specify the type of the records state variable as an array of RecordItem objects

  useEffect(() => {
    async function getRecords() {
      const data = await getDocs(
        query(
          collection(db, "jobs"),
          limit(recordsLimit),
          orderBy("date"),
          startAfter(itemToStart)
        )
      );
      const records = data.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as RecordItem)
      ); // Cast the DocumentData objects to RecordItem objects
      setRecords(records);
    }
    getRecords();
  }, [itemToStart, recordsLimit]);

  return records;
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
