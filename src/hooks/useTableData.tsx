import { data } from "../tableData.json";

export const useTableData = (offset: number, numberOfStrings: number) => {
  const tableData = data;
  const tableDataLength = tableData.length;
  const tableDataSlice = tableData.slice(
    tableDataLength - offset - numberOfStrings,
    tableDataLength - offset
  );
  return tableDataSlice;
};
