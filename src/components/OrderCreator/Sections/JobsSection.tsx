import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
export function JobsSection() {
  return (
    <>
      <h4 className="text-medium font-medium">Дані про роботу</h4>
      <Autocomplete
        label="Замовник"
        labelPlacement="inside"
        className="max-w-xl"
        size="md"
        variant="bordered"
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
    </>
  );
}
