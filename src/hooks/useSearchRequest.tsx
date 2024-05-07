import { DateValue } from "@nextui-org/react";
import { Key } from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  searchRequest: {
    searchString: null,
    orderer: null,
    patient: null,
    technician: null,
    dateRange: null,
  },
};

const { useGlobalState } = createGlobalState(initialState);

export function useSearchRequest() {
  const [searchRequest, setSearchRequest] = useGlobalState("searchRequest");

  function setSearchRequestField(
    field: string,
    value: Key | null | { start: DateValue | null; end: DateValue | null }
  ) {
    setSearchRequest((prev) => ({ ...prev, [field]: value }));
  }
  //   console.log(searchRequest);

  return { searchRequest, setSearchRequestField };
}
