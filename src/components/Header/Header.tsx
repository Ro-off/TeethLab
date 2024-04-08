import {
  Navbar,
  NavbarItem,
  Input,
  Autocomplete,
  AutocompleteItem,
  NavbarContent,
  Button,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useAnimals } from "../../hooks/useAnimals";
import { useState } from "react";
import { FilterAlt } from "../../Icons/FilterAlt";

export function Header() {
  const animals = useAnimals();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterFiled] = useState(false);

  return (
    <>
      <Navbar maxWidth="full" onMenuOpenChange={setIsFilterOpen}>
        <Button
          isIconOnly
          color={!isFilterFiled && !isFilterOpen ? "default" : "secondary"}
          aria-label="Filter"
          size="lg"
          className="sm:hidden"
          variant="solid"
        >
          <FilterAlt fill="white" />
        </Button>

        <NavbarItem className="w-64 justify-self-start">
          <Input type="search" label="Пошук" size="sm" />
        </NavbarItem>

        {/* <NavbarContent></NavbarContent> */}

        <NavbarContent className="hidden sm:flex gap-2 " justify="start">
          <NavbarItem>
            <Autocomplete label="Замовник" className="max-w-xs" size="sm">
              {animals.map((animal) => (
                <AutocompleteItem key={animal.value} value={animal.value}>
                  {animal.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </NavbarItem>
          <NavbarItem>
            <Autocomplete label="Пацієнт" className="max-w-xs" size="sm">
              {animals.map((animal) => (
                <AutocompleteItem key={animal.value} value={animal.value}>
                  {animal.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </NavbarItem>
          <NavbarItem>
            <Autocomplete label="Технік" className="max-w-xs" size="sm">
              {animals.map((animal) => (
                <AutocompleteItem key={animal.value} value={animal.value}>
                  {animal.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </NavbarItem>
          <NavbarItem>
            <Autocomplete label="Проміжок часу" className="max-w-xs" size="sm">
              {animals.map((animal) => (
                <AutocompleteItem key={animal.value} value={animal.value}>
                  {animal.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem key="test-1">
            <p>d</p>
          </NavbarMenuItem>
        </NavbarMenu>

        <Button
          color="primary"
          size="lg"
          variant="shadow"
          className="ml-2 ml-auto"
        >
          Новий запис
        </Button>
      </Navbar>
    </>
  );
}
