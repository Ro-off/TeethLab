import { useEffect, useState } from "react";
import { data } from "../tableData.json";

function removeLimitOffsetFromQuery(paramsQuery: URLSearchParams) {
  const newQuery = new URLSearchParams(paramsQuery);
  newQuery.delete("limit");
  newQuery.delete("offset");
  return newQuery;
}
export function useServerTableData(paramsQuery: URLSearchParams) {
  const tableData = data;
  const offset: string | null = paramsQuery.get("offset");
  const limit: string | null = paramsQuery.get("limit");

  const searchQuery = removeLimitOffsetFromQuery(paramsQuery);
  console.log("paramsQuery");
  console.log(paramsQuery.toString());
  const filteredData = tableData.filter(
    (item: { [key: string]: string | number }) => {
      for (const [key, value] of searchQuery) {
        if (item[key] !== value) {
          return false;
        }
      }
      return true;
    }
  );

  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredData2, setFilteredData2] = useState<
    { [key: string]: string | number }[] | null
  >(null);

  useEffect(() => {
    window.setTimeout(() => {
      setIsLoading(false);
      setFilteredData2(
        filteredData.slice(Number(offset), Number(offset) + Number(limit))
      );
      setTotal(filteredData.length);
    }, 3000);
  }, [filteredData, offset, limit]);

  return { isLoading, data: filteredData2, total };
}
