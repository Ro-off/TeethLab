import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FilterAlt } from "../../../Icons/FilterAlt";

export function MobileFilter(props: {
  items: { label: string; value: string }[];
}) {
  const { items } = props;
  console.log(items);

  const [isFilterOpen] = useState(false);
  const [isFilterFiled] = useState(false);

  return (
    <Button
      isIconOnly
      color={isFilterOpen ? "primary" : isFilterFiled ? "secondary" : "default"}
      size="lg"
      className="md:hidden"
      variant="solid"
    >
      <FilterAlt fill="white" />
    </Button>
  );
}
