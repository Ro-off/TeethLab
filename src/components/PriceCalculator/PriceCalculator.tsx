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
import { RecordItem } from "../../hooks/useRecords";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function PriceCalculator(props: { items: RecordItem[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { items } = props;
  console.log(items);

  const totalSumUAH = items.reduce((acc, item) => acc + item.priceUah, 0);
  const totalSumUSD = items.reduce((acc, item) => acc + item.priceUsd, 0);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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
              <div ref={contentRef}>
                <ModalBody>
                  <PriceTable items={items} />
                  <PriceSummery usdPrice={totalSumUSD} uahPrice={totalSumUAH} />
                </ModalBody>
              </div>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрити
                </Button>
                <Button color="primary" onPress={() => reactToPrintFn()}>
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
