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

export function useRecords(itemToStart: RecordItem, recordsLimit: number) {
  const [response, setResponse] = useState<{
    count: null | number;
    next: null | RecordItem;
    previous: null | RecordItem;
    results: null | RecordItem[];
    isLoading: boolean;
  }>({
    count: 2,
    next: null,
    previous: itemToStart,
    results: null,
    isLoading: true,
  }); // Specify the type of the records state variable as an array of RecordItem objects

  useEffect(() => {
    async function getRecords() {
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
      setResponse({
        count: null,
        previous: itemToStart,
        next: next ? next : null,
        results,
        isLoading: false,
      });
    }
    getRecords();
  }, [itemToStart, recordsLimit]);

  return response;
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
