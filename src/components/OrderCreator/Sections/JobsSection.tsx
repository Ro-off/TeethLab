import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
export function JobsSection() {
  return (
    <>
      <h4 className="text-medium font-medium">Дані про роботу</h4>
      <Autocomplete
        label="Послуга"
        labelPlacement="inside"
        className="max-w-xl"
        size="md"
        variant="bordered"
      >
        <AutocompleteItem key={"1_Service"} value="1">
          Послуга 1
        </AutocompleteItem>
        <AutocompleteItem key={"2_Service"} value="2">
          Послуга 2
        </AutocompleteItem>
        <AutocompleteItem key={"3_Service"} value="3">
          Послуга 3
        </AutocompleteItem>
      </Autocomplete>
    </>
  );
}
