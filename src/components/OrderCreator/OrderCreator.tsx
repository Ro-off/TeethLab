import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";

import { InfoSection } from "./Sections/InfoSection";
import { JobsSection } from "./Sections/JobsSection";

export function OrderCreator(props: {
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen: () => void;
}) {
  const { isOpen, onOpenChange } = props;

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
                <InfoSection />
                <Divider className="my-4" />
                <JobsSection />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Відмінити
                </Button>
                <Button color="primary" onPress={onClose}>
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
