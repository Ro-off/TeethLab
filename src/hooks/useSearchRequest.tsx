import { DateValue, RangeValue } from "@nextui-org/react";
import { Key } from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  searchRequest: {
    searchString: null as string | null,
    client: null as string | null,
    patient: null as string | null,
    technician: null as string | null,
    dateRange: null as RangeValue<DateValue> | null,
  },
};

const { useGlobalState } = createGlobalState(initialState);

export function useSearchRequest() {
  const [searchRequest, setSearchRequest] = useGlobalState("searchRequest");

  function setSearchRequestField(
    field: string,
    value: Key | null | { start: DateValue | null; end: DateValue | null }
  ) {
    console.log("Setting search request field:", field, value);

    if (field === "client") {
      if (value === searchRequest.client) return;

      setSearchRequest((prev) => ({
        ...prev,
        client: value as string | null,
        patient: null,
      }));
      return;
    }

    setSearchRequest((prev) => ({ ...prev, [field]: value }));
  }

  return { searchRequest, setSearchRequestField };
}
