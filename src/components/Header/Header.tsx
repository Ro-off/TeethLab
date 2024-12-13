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
import { useState, useEffect, useRef } from "react";
import { usePatients } from "../../hooks/usePatients";
import { useSearchRequest } from "../../hooks/useSearchRequest";
import { doSignOut } from "../../auth";
import { LogOut } from "../../Icons/LogOut";
import { useAuth } from "../../context/authContext";

export function Header() {
  const { isMd } = useBreakpoint("md");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { getAllClients } = useClients();
  const { getAllTechnicians } = useTechnicians();
  const { getAllPatientsByClientId } = usePatients();
  const { searchRequest } = useSearchRequest();
  const { userLoggedIn } = useAuth();

  const [data, setData] = useState<{
    clients: Array<{ label: string; value: string }>;
    technicians: Array<{ label: string; value: string }>;
    patients: Array<{ label: string; value: string }>;
  }>({
    clients: [],
    technicians: [],
    patients: [],
  });

  // Використовуємо useRef для відстеження першого рендеру
  const isFirstRender = useRef(true);

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
      if (searchRequest.client) {
        const patientsResult = await getAllPatientsByClientId(
          searchRequest.client
        );
        setData((prev) => ({
          ...prev,
          patients: patientsResult,
        }));
      }
    };
    loadPatients();
  }, [searchRequest.client, getAllPatientsByClientId]);

  return (
    <>
      <Navbar maxWidth="full">
        {!isMd && (
          <MobileFilter
            clients={data.clients}
            technicians={data.technicians}
            patients={data.patients}
          />
        )}

        <NavbarItem className="w-full md:w-64 justify-self-start">
          <Input type="search" label="Пошук" size="sm" />
        </NavbarItem>

        <DesktopFilter
          clients={data.clients}
          technicians={data.technicians}
          patients={data.patients}
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
        <Button
          color="default"
          size="lg"
          variant="shadow"
          className="ml-2"
          onPress={doSignOut}
          isIconOnly
        >
          <LogOut />
        </Button>

        <OrderCreator
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          listData={data}
        />
      </Navbar>
    </>
  );
}
