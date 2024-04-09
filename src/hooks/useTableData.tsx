import { data } from "../tableData.json";
import { useState, useEffect } from "react";

function getData(offset: number, numberOfStrings: number) {
  const tableData = data;
  const tableDataLength = tableData.length;
  const tableDataSlice = tableData.slice(
    tableDataLength - offset - numberOfStrings,
    tableDataLength - offset
  );
  return tableDataSlice;
}

export const useTableData = (offset: number, numberOfStrings: number) => {
  const [data, setData] = useState<
    {
      id: number;
      client: string;
      patient: string;
      date: string;
      technician: string;
      comments: string;
    }[]
  >([]);

  useEffect(() => {
    setData(() => [...data, ...getData(offset, numberOfStrings)]);
  }, [offset, numberOfStrings]);
  return data;
};
