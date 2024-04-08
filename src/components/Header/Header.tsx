import {
  Navbar,
  NavbarItem,
  Input,
  Autocomplete,
  AutocompleteItem,
  NavbarContent,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useAnimals } from "../../hooks/useAnimals";
import { useState } from "react";

export function Header() {
  const animals = useAnimals();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarItem className="w-64">
          <Input type="search" label="Пошук" size="sm" />
        </NavbarItem>

        {/* <NavbarContent></NavbarContent> */}

        <NavbarContent className="hidden sm:flex gap-4" justify="start">
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
            <Autocomplete label="Час прийому" className="max-w-xs" size="sm">
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

        {/*         
        <NavbarContent className="hidden sm:flex gap-2" justify="end">

          </NavbarContent> */}
        <Button color="primary" size="lg" variant="shadow">
          Новий запис
        </Button>
      </Navbar>
    </>
  );
}
