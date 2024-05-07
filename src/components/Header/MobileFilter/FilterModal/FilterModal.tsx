import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Autocomplete,
  AutocompleteItem,
  DateRangePicker,
} from "@nextui-org/react";
import { useSearchRequest } from "../../../../hooks/useSearchRequest";

export function FilterModal(props: {
  isOpen: boolean;
  onOpenChange: () => void;
  items: { label: string; value: string }[];
}) {
  const { isOpen, onOpenChange, items } = props;
  const { searchRequest, setSearchRequestField } = useSearchRequest();

  //   const { onOpenChange } = useDisclosure();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={"top"}
      className="mt-20"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Фільтр</ModalHeader>
            <ModalBody>
              <Autocomplete
                label="Замовник"
                className="max-w-xl"
                size="md"
                variant="bordered"
                selectedKey={searchRequest.orderer}
                onSelectionChange={(value) =>
                  setSearchRequestField("orderer", String(value))
                }
              >
                {items.map((item) => (
                  <AutocompleteItem key={item.value} value={item.value}>
                    {item.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Autocomplete
                label="Пацієнт"
                className="max-w-xl"
                size="md"
                variant="bordered"
                selectedKey={searchRequest.patient}
                onSelectionChange={(value) =>
                  setSearchRequestField("patient", String(value))
                }
              >
                {items.map((item) => (
                  <AutocompleteItem key={item.value} value={item.value}>
                    {item.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Autocomplete
                label="Технік"
                className="max-w-xl"
                size="md"
                variant="bordered"
                selectedKey={searchRequest.technician}
                onSelectionChange={(value) =>
                  setSearchRequestField("technician", String(value))
                }
              >
                {items.map((item) => (
                  <AutocompleteItem key={item.value} value={item.value}>
                    {item.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <DateRangePicker
                label="Проміжок часу"
                className="max-w-xl"
                size="md"
                variant="bordered"
                value={searchRequest.dateRange}
                onChange={(value) => setSearchRequestField("dateRange", value)}
              />
            </ModalBody>
            <ModalFooter>
              {/* <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button> */}
              <Button color="primary" onPress={onClose} size="lg">
                Пошук
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
