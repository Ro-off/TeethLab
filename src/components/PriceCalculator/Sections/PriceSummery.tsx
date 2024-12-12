import { Card, Divider, CardBody } from "@nextui-org/react";

export function PriceSummery(props: { usdPrice: number; uahPrice: number }) {
  const { usdPrice, uahPrice } = props;
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
