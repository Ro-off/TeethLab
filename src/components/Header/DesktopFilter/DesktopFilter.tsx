import {
  Autocomplete,
  AutocompleteItem,
  NavbarItem,
  NavbarContent,
  DateRangePicker,
} from "@nextui-org/react";
import { useSearchRequest } from "../../../hooks/useSearchRequest";

export function DesktopFilter(props: {
  clients: { label: string; value: string }[];
  technicians: { label: string; value: string }[];
  patients: { label: string; value: string }[];
}) {
  const { clients, technicians, patients } = props;
  const { searchRequest, setSearchRequestField } = useSearchRequest();
  {
    return (
      <NavbarContent className="hidden md:flex gap-2" justify="start">
        <NavbarItem>
          <Autocomplete
            label="Замовник"
            className="max-w-xs"
            size="sm"
            selectedKey={searchRequest.client}
            onSelectionChange={(value) =>
              setSearchRequestField("client", value)
            }
          >
            {clients.map((item) => (
              <AutocompleteItem key={item.value} value={item.value}>
                {item.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </NavbarItem>
        <NavbarItem>
          <Autocomplete
            label="Пацієнт"
            className="max-w-xs"
            size="sm"
            selectedKey={searchRequest.patient}
            isDisabled={searchRequest.client == null}
            onSelectionChange={(value) =>
              setSearchRequestField("patient", value)
            }
          >
            {patients.map((item) => (
              <AutocompleteItem key={item.value} value={item.value}>
                {item.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </NavbarItem>
        <NavbarItem>
          <Autocomplete
            label="Технік"
            className="max-w-xs"
            size="sm"
            selectedKey={searchRequest.technician}
            onSelectionChange={(value) =>
              setSearchRequestField("technician", value)
            }
          >
            {technicians.map((item) => (
              <AutocompleteItem key={item.value} value={item.value}>
                {item.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </NavbarItem>
        <NavbarItem>
          <DateRangePicker
            label="Проміжок часу"
            className="max-w-xs"
            size="sm"
            value={searchRequest.dateRange}
            onChange={(value) =>
              setSearchRequestField("dateRange", {
                start: value.start,
                end: value.end,
              })
            }
          />
        </NavbarItem>
      </NavbarContent>
    );
  }
}
