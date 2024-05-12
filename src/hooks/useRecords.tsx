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

//todo: move to separate hook
// function conventTimestampToDate(timestamp: number) {
//   return new Date(timestamp * 1000).toLocaleDateString();
// }

// function getTimestampFromDate(date: Date) {
//   return new Date(date).getTime() / 1000;
// }

const recordsCollectionRef = collection(db, "jobs");
export function useRecords() {
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
    const records = data.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
          //todo: change date format in firebase
          // date: conventTimestampToDate(doc.data().date.seconds),
        } as RecordItem)
    ); // Cast the DocumentData objects to RecordItem objects
    const results = records.slice(0, recordsLimit);
    const next = records[recordsLimit];
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
      // date: { seconds: getTimestampFromDate(record.date) },
      comments: record.comments ? record.comments : "",
    };
    console.log(serverRecord);
    await addDoc(recordsCollectionRef, record);
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
}
