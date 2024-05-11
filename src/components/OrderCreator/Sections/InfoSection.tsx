import {
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  // DateValue,
} from "@nextui-org/react";
import { RecordItem } from "../../../hooks/useRecords";
// import { parseDate } from "@internationalized/date";

export function InfoSection(props: {
  record: RecordItem;
  setRecord: (record: RecordItem) => void;
}) {
  const { record, setRecord } = props;

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
        size="md"
        variant={fieldVariants[0]}
        selectedKey={record.client}
        onSelectionChange={(value) =>
          setRecord({ ...record, client: value as string })
        }
        isRequired
      >
        <AutocompleteItem key={"1_Client"} value="1">
          Замовник 1
        </AutocompleteItem>
        <AutocompleteItem key={"2_Client"} value="2">
          Замовник 2
        </AutocompleteItem>
        <AutocompleteItem key={"3_Client"} value="3">
          Замовник 3
        </AutocompleteItem>
      </Autocomplete>
      <Autocomplete
        label="Пацієнт"
        labelPlacement="inside"
        className="max-w-xl"
        size="md"
        variant={fieldVariants[0]}
        selectedKey={record.patient}
        onSelectionChange={(value) =>
          setRecord({ ...record, patient: value as string })
        }
        isRequired
      >
        <AutocompleteItem key={"1_Patient"} value="1">
          Пацієнт 1
        </AutocompleteItem>
        <AutocompleteItem key={"2_Patient"} value="2">
          Пацієнт 2
        </AutocompleteItem>
        <AutocompleteItem key={"3_Patient"} value="3">
          Пацієнт 3
        </AutocompleteItem>
      </Autocomplete>
      <Autocomplete
        label="Технік"
        labelPlacement="inside"
        className="max-w-xl"
        size="md"
        variant={fieldVariants[0]}
        selectedKey={record.technician}
        onSelectionChange={(value) =>
          setRecord({ ...record, technician: value as string })
        }
        isRequired
      >
        <AutocompleteItem key={"1_Technician"} value="1">
          Технік 1
        </AutocompleteItem>
        <AutocompleteItem key={"2_Technician"} value="2">
          Технік 2
        </AutocompleteItem>
        <AutocompleteItem key={"3_Technician"} value="3">
          Технік 3
        </AutocompleteItem>
      </Autocomplete>

      <DatePicker
        label="Дата процедури"
        labelPlacement="inside"
        className="max-w-xl"
        size="md"
        variant={fieldVariants[0]}
        isRequired
        // value={record.date ? parseDate(record.date) : null}
        // onChange={(value) => setRecord({ ...record, date: value.toString() })}
      />
    </>
  );
}
