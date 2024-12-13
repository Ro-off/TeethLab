import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { useRef, useEffect, useState } from "react";
import { InfoSection } from "./Sections/InfoSection";
import { JobsSection } from "./Sections/JobsSection";
import { PriceSection } from "./Sections/PriceSection";
import { RecordItem } from "../../hooks/useRecords";
import { useRecords } from "../../hooks/useRecords";

import { useClients } from "../../hooks/useClients";
import { useTechnicians } from "../../hooks/useTechnicians";
import { usePatients } from "../../hooks/usePatients";
import { useAuth } from "../../context/authContext";

export function OrderCreator(props: {
  isOpen: boolean;

  onOpen: () => void;

  onOpenChange: () => void;

  listData: {
    clients: Array<{ label: string; value: string }>;

    technicians: Array<{ label: string; value: string }>;

    patients: Array<{ label: string; value: string }>;
  };
}) {
  const { isOpen, onOpenChange } = props;
  const { createRecord } = useRecords();
  const { userLoggedIn } = useAuth();

  const [record, setRecord] = useState<RecordItem>({
    client: null,
    patient: null,
    technician: null,
    date: null,
    comments: null,
    priceUah: 0,
    priceUsd: 0,
  });

  const isFirstRender = useRef(true);

  const { getAllClients } = useClients();
  const { getAllTechnicians } = useTechnicians();
  const { getAllPatientsByClientId } = usePatients();

  //todo: remove duplicate code
  const [listData, setData] = useState<{
    clients: Array<{ label: string; value: string }>;
    technicians: Array<{ label: string; value: string }>;
    patients: Array<{ label: string; value: string }>;
  }>({
    clients: [],
    technicians: [],
    patients: [],
  });

  useEffect(() => {
    // Завантажуємо клієнтів і техніків тільки один раз при першому рендері
    if (isFirstRender.current && userLoggedIn) {
      const loadInitialData = async () => {
        console.log("Initial load");
        const clientsResult = await getAllClients();
        const techniciansResult = await getAllTechnicians();
        setData((prev) => ({
          ...prev,
          clients: clientsResult,
          technicians: techniciansResult,
        }));
      };
      loadInitialData();
      isFirstRender.current = false;
    }
  }, [getAllClients, getAllTechnicians, userLoggedIn]);

  // Окремий useEffect тільки для пацієнтів
  useEffect(() => {
    const loadPatients = async () => {
      if (record.client) {
        const patientsResult = await getAllPatientsByClientId(record.client);
        setData((prev) => ({
          ...prev,
          patients: patientsResult,
        }));
      }
    };
    loadPatients();
  }, [record.client, getAllPatientsByClientId]);

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
                <InfoSection
                  record={record}
                  setRecord={setRecord}
                  listData={listData}
                />
                <Divider className="my-0" />
                <JobsSection />
                <Divider className="my-0" />
                <PriceSection record={record} setRecord={setRecord} />
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
