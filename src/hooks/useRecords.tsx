import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export function useRecords(offset: number, limit: number) {
  const [records, setRecords] = useState<RecordItem[]>([]); // Specify the type of the records state variable as an array of RecordItem objects

  async function getRecords() {
    const data = await getDocs(collection(db, "jobs"));
    const records = data.docs.map((doc) => doc.data() as RecordItem); // Cast the DocumentData objects to RecordItem objects
    setRecords(records);
  }

  useEffect(() => {
    getRecords();
  }, [offset, limit]);

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
