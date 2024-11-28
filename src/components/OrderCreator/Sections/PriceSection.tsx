import { Input } from "@nextui-org/react";
import { useState } from "react";

export function PriceSection() {
  const [priceUAH, setPriceUAH] = useState(0);
  const [priceUSD, setPriceUSD] = useState(0);
  const [course, setCourse] = useState(41);

  function changePriceUAH(value: string) {
    let parsedValue = Number(value) >= 0 ? Number(value) : 0;
    setPriceUAH(parsedValue);
    setPriceUSD(Math.round(parsedValue / course));
  }

  function changePriceUSD(value: string) {
    let parsedValue = Number(value) >= 0 ? Number(value) : 0;
    setPriceUSD(parsedValue);
    setPriceUAH(parsedValue * course);
  }

  function changeCourse(value: string) {
    let parsedValue = Number(value) >= 0 ? Number(value) : 0;
    setCourse(parsedValue);
    setPriceUSD(Math.round(priceUAH / course));
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
          value={priceUAH.toString()}
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
          value={priceUSD.toString()}
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
