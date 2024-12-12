import {
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  // DateValue,
} from "@nextui-org/react";
import { RecordItem } from "../../../hooks/useRecords";
import { parseDate } from "@internationalized/date";

export function InfoSection(props: {
  record: RecordItem;
  setRecord: (record: RecordItem) => void;
  listData: {
    clients: { label: string; value: string }[];
    technicians: { label: string; value: string }[];
    patients: { label: string; value: string }[];
  };
}) {
  const { record, setRecord, listData } = props;

  const fieldVariants: Array<"bordered" | "flat" | "underlined" | "faded"> = [
    "bordered",
    "flat",
    "underlined",
    "faded",
  ];

  return (
    <>
      <h4 className="text-medium font-medium">Дані про запис</h4>
      <Autocomplete
        label="Замовник"
        labelPlacement="inside"
        className="max-w-xl"
        defaultItems={listData.clients}
        size="md"
        variant={fieldVariants[0]}
        selectedKey={record.client}
        onSelectionChange={(value) =>
          setRecord({ ...record, client: value as string })
        }
        isRequired
      >
        {(client) => (
          <AutocompleteItem key={client.value}>{client.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <Autocomplete
        label="Пацієнт"
        labelPlacement="inside"
        className="max-w-xl"
        size="md"
        variant={fieldVariants[0]}
        defaultItems={listData.patients}
        selectedKey={record.patient}
        onSelectionChange={(value) =>
          setRecord({ ...record, patient: value as string })
        }
        isRequired
      >
        {(patient) => (
          <AutocompleteItem key={patient.value}>
            {patient.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Autocomplete
        label="Технік"
        labelPlacement="inside"
        className="max-w-xl"
        size="md"
        variant={fieldVariants[0]}
        selectedKey={record.technician}
        defaultItems={listData.technicians}
        onSelectionChange={(value) =>
          setRecord({ ...record, technician: value as string })
        }
        isRequired
      >
        {(technician) => (
          <AutocompleteItem key={technician.value}>
            {technician.label}
          </AutocompleteItem>
        )}
      </Autocomplete>

      <DatePicker
        label="Дата процедури"
        labelPlacement="inside"
        className="max-w-xl"
        size="md"
        variant={fieldVariants[0]}
        isRequired
        value={record.date ? parseDate(record.date) : null}
        onChange={(value) =>
          setRecord({ ...record, date: value?.toString() ?? "" })
        }
      />
    </>
  );
}
