// import { data } from "../tableData.json";
// import { useState, useEffect } from "react";
import { useServerTableData } from "./useServerTableData";
import { useSearchRequest } from "./useSearchRequest";

function createSearchQuery(
  searchRequest: searchRequest,
  offset: number,
  limit: number
) {
  const searchQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(searchRequest)) {
    if (value) {
      searchQuery.append(key, value.toString());
    }
  }
  searchQuery.append("offset", offset.toString());
  searchQuery.append("limit", limit.toString());
  return searchQuery;
}

export const useTableData = (offset: number, numberOfStrings: number) => {
  const { searchRequest } = useSearchRequest();
  const paramsQuery = createSearchQuery(searchRequest, offset, numberOfStrings);
  const { data, total, isLoading } = useServerTableData(paramsQuery);

  return { data, total, isLoading };
};

type searchRequest = {
  searchString: string | null;
  client: string | null;
  patient: string | null;
  technician: string | null;
  dateRange: { start: DateValue | null; end: DateValue | null } | null;
};

import { DateValue } from "@react-types/calendar";
