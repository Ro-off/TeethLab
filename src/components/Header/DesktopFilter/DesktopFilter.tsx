import {
  Autocomplete,
  AutocompleteItem,
  NavbarItem,
  NavbarContent,
} from "@nextui-org/react";

export function DesktopFilter(props: {
  items: { label: string; value: string }[];
}) {
  const { items } = props;
  {
    return (
      <NavbarContent className="hidden sm:flex gap-2 " justify="start">
        <NavbarItem>
          <Autocomplete label="Замовник" className="max-w-xs" size="sm">
            {items.map((item) => (
              <AutocompleteItem key={item.value} value={item.value}>
                {item.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </NavbarItem>
        <NavbarItem>
          <Autocomplete label="Пацієнт" className="max-w-xs" size="sm">
            {items.map((item) => (
              <AutocompleteItem key={item.value} value={item.value}>
                {item.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </NavbarItem>
        <NavbarItem>
          <Autocomplete label="Технік" className="max-w-xs" size="sm">
            {items.map((item) => (
              <AutocompleteItem key={item.value} value={item.value}>
                {item.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </NavbarItem>
        <NavbarItem>
          <Autocomplete label="Проміжок часу" className="max-w-xs" size="sm">
            {items.map((item) => (
              <AutocompleteItem key={item.value} value={item.value}>
                {item.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </NavbarItem>
      </NavbarContent>
    );
  }
}
