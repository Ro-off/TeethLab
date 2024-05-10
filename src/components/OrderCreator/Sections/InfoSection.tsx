import {
  Autocomplete,
  AutocompleteItem,
  DateRangePicker,
} from "@nextui-org/react";

export function InfoSection() {
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
      <DateRangePicker
        label="Дата процедури"
        labelPlacement="inside"
        className="max-w-xl"
        size="md"
        variant={fieldVariants[0]}
      />
    </>
  );
}
