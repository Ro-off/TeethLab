import { Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { FilterAlt } from "../../../Icons/FilterAlt";
import { FilterModal } from "./FilterModal/FilterModal";

export function MobileFilter(props: {
  clients: { label: string; value: string }[];
  technicians: { label: string; value: string }[];
  patients: { label: string; value: string }[];
}) {
  const { clients, technicians, patients } = props;

  // const [isFilterOpen] = useState(true);

  const { isOpen: isFilterOpen, onOpen, onOpenChange } = useDisclosure();

  const [isFilterFiled] = useState(false);

  return (
    <>
      <Button
        isIconOnly
        color={
          isFilterOpen ? "primary" : isFilterFiled ? "secondary" : "default"
        }
        size="lg"
        // className="md:hidden"
        variant="solid"
        onClick={onOpen}
      >
        <FilterAlt className="fill-default-600" />
      </Button>
      <FilterModal
        isOpen={isFilterOpen}
        onOpenChange={onOpenChange}
        clients={clients}
        technicians={technicians}
        patients={patients}
      />
    </>
  );
}
