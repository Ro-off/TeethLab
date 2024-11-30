import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Stats } from "../../Icons/Stats";
import { PriceTable } from "./Sections/PriceTable";
import { PriceSummery } from "./Sections/PriceSummery";

export function PriceCalculator() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        size="lg"
        color="primary"
        // variant=""
        className="fixed right-3 bottom-3"
        variant="shadow"
      >
        <Stats fill="white" />
      </Button>

      <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Підрахунок вартості
              </ModalHeader>
              <ModalBody>
                <PriceTable />
                <PriceSummery />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрити
                </Button>
                <Button color="primary" onPress={onClose}>
                  Створити документ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
