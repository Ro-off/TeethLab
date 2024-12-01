import {
  Navbar,
  NavbarItem,
  Input,
  Button,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { DesktopFilter } from "./DesktopFilter/DesktopFilter";
import { MobileFilter } from "./MobileFilter/MobileFilter";
import { Plus } from "../../Icons/Plus";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { OrderCreator } from "../OrderCreator/OrderCreator";
import { useDisclosure } from "@nextui-org/react";
import { useClients } from "../../hooks/useClients";
import { useTechnicians } from "../../hooks/useTechnicians";
import { useState, useEffect } from "react";
import { usePatients } from "../../hooks/usePatients";
import { useSearchRequest } from "../../hooks/useSearchRequest";

export function Header() {
  const { isMd } = useBreakpoint("md");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { getAllClients } = useClients();
  const { getAllTechnicians } = useTechnicians();
  const { getAllPatientsByClientId } = usePatients();
  const { searchRequest } = useSearchRequest();

  const [clients, setClients] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const [technicians, setTechnicians] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const [patients, setPatients] = useState<
    Array<{ label: string; value: string }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const clientsResult = await getAllClients();
      const techniciansResult = await getAllTechnicians();
      if (searchRequest.client != null) {
        const patientsResult = await getAllPatientsByClientId(
          searchRequest.client
        );
        setPatients(patientsResult);
      }
      setClients(clientsResult);
      setTechnicians(techniciansResult);
    };
    fetchData();
  }, [
    getAllClients,
    getAllTechnicians,
    getAllPatientsByClientId,
    searchRequest,
  ]);

  return (
    <>
      <Navbar maxWidth="full">
        {!isMd && (
          <MobileFilter
            clients={clients}
            technicians={technicians}
            patients={patients}
          />
        )}

        <NavbarItem className="w-full md:w-64 justify-self-start">
          <Input type="search" label="Пошук" size="sm" />
        </NavbarItem>

        <DesktopFilter
          clients={clients}
          technicians={technicians}
          patients={patients}
        />

        <NavbarMenu>
          <NavbarMenuItem key="test-1">
            <p>d</p>
          </NavbarMenuItem>
        </NavbarMenu>

        <Button
          color="primary"
          size="lg"
          variant="shadow"
          className=" ml-auto min-w-12 pr-1 pl-1 md:min-w-32 md:pr-4 md:pl-4"
          onClick={onOpen}
        >
          <p className="hidden md:block">Новий запис</p>
          <Plus fill="white" className="md:hidden" />
        </Button>
        <OrderCreator
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      </Navbar>
    </>
  );
}
