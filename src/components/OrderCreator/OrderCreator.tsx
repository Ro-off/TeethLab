import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";
import { InfoSection } from "./Sections/InfoSection";
import { JobsSection } from "./Sections/JobsSection";
import { RecordItem } from "../../hooks/useRecords";
import { useRecords } from "../../hooks/useRecords";

export function OrderCreator(props: {
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen: () => void;
}) {
  const { isOpen, onOpenChange } = props;
  const { createRecord } = useRecords();

  const [record, setRecord] = useState<RecordItem>({
    client: null,
    patient: null,
    technician: null,
    date: null,
    comments: null,
  });

  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
        size="xl"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Створення нового запису
              </ModalHeader>
              <ModalBody>
                <InfoSection record={record} setRecord={setRecord} />
                <Divider className="my-4" />
                <JobsSection />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Відмінити
                </Button>
                <Button color="primary" onPress={() => createRecord(record)}>
                  Створити
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
