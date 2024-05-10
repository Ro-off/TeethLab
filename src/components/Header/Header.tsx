import {
  Navbar,
  NavbarItem,
  Input,
  Button,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useAnimals } from "../../hooks/useAnimals";
import { DesktopFilter } from "./DesktopFilter/DesktopFilter";
import { MobileFilter } from "./MobileFilter/MobileFilter";
import { Plus } from "../../Icons/Plus";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { OrderCreator } from "../OrderCreator/OrderCreator";
import { useDisclosure } from "@nextui-org/react";

export function Header() {
  const animals = useAnimals();
  const { isMd } = useBreakpoint("md");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Navbar maxWidth="full">
        {!isMd && <MobileFilter items={animals} />}

        <NavbarItem className="w-full md:w-64 justify-self-start">
          <Input type="search" label="Пошук" size="sm" />
        </NavbarItem>

        <DesktopFilter items={animals} />

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
