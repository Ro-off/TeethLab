import { Card, Divider, CardBody } from "@nextui-org/react";
import { useState } from "react";

export function PriceSummery() {
  const [usdPrice, setUsdPrice] = useState(100);
  const [uahPrice, setUahPricw] = useState(10000);

  return (
    <>
      <Card>
        <CardBody className="flex flex-row justify-around items-center h-12 text-md font-medium	">
          <p>{String(usdPrice) + "$"}</p>
          <Divider orientation="vertical" />
          <p>{String(uahPrice) + "₴"}</p>
        </CardBody>
      </Card>
    </>
  );
}
