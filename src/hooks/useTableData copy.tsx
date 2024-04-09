import { useState } from "react";
import { data } from "../tableData.json";

export const useTableData = (offset: number, numberOfStrings: number) => {
  const [tableData, setTableData] = useState<
    {
      id: number;
      client: string;
      patient: string;
      date: string;
      technician: string;
      comments: string;
    }[]
  >([]);

  function getData() {
    const tableData = data;
    const tableDataLength = tableData.length;
    const tableDataSlice = tableData.slice(
      tableDataLength - offset - numberOfStrings,
      tableDataLength - offset
    );
    return tableDataSlice;
  }

  function load() {
    setTableData([...tableData, ...getData()]);
  }

  return { get: tableData, load: load };
};
