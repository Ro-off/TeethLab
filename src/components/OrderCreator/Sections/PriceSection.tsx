import { Input } from "@nextui-org/react";
import { useState } from "react";
import { RecordItem } from "../../../hooks/useRecords";

export function PriceSection(props: {
  record: RecordItem;
  setRecord: (record: RecordItem) => void;
}) {
  // const [priceUAH, setPriceUAH] = useState(0);
  // const [priceUSD, setPriceUSD] = useState(0);

  const [course, setCourse] = useState(41);
  const { record, setRecord } = props;

  function changePriceUAH(value: string) {
    const parsedValue = Number(value) >= 0 ? Number(value) : 0;
    setRecord({
      ...record,
      priceUah: parsedValue,
      priceUsd: Math.round(parsedValue / course),
    });
  }

  function changePriceUSD(value: string) {
    const parsedValue = Number(value) >= 0 ? Number(value) : 0;
    setRecord({
      ...record,
      priceUsd: parsedValue,
      priceUah: parsedValue * course,
    });
    // setRecord({ ...record, priceUah: parsedValue * course });
  }

  function changeCourse(value: string) {
    const parsedValue = Number(value) >= 0 ? Number(value) : 0;
    setCourse(parsedValue);
    if (record.priceUah !== null) {
      setRecord({
        ...record,
        priceUsd: Math.round(record.priceUah / parsedValue),
      });
    }
  }

  return (
    <>
      <h4 className="text-medium font-medium">Ціна</h4>
      <div className="flex items-center gap-4">
        <Input
          label="UAH"
          labelPlacement="inside"
          type="number"
          className="max-w-xl"
          variant="bordered"
          value={record.priceUah ? record.priceUah.toString() : "0"}
          onValueChange={changePriceUAH}
          min={0}
        >
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">₴</span>
          </div>
        </Input>
        <Input
          label="Курс"
          labelPlacement="inside"
          type="number"
          className="max-w-xl"
          variant="bordered"
          value={course.toString()}
          onValueChange={changeCourse}
          min={0}
        />
        <Input
          label="USD"
          labelPlacement="inside"
          type="number"
          className="max-w-xl"
          variant="bordered"
          value={record.priceUsd ? record.priceUsd.toString() : "0"}
          onValueChange={changePriceUSD}
          min={0}
        >
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        </Input>
      </div>
    </>
  );
}
