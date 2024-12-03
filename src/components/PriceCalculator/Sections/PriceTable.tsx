import {
  Table,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  TableBody,
  getKeyValue,
} from "@nextui-org/react";
import { RecordItem } from "../../../hooks/useRecords";

export function PriceTable(props: { items: RecordItem[] }) {
  const { items } = props;

  const columns = [
    {
      key: "clientPatient",
      label: "CLIENT/PATiENT",
    },
    // {
    //   key: "patient",
    //   label: "PATIENT",
    // },
    {
      key: "technician",
      label: "TECHNICIAN",
    },
    {
      key: "date",
      label: "DATE",
    },
    {
      key: "price",
      label: "Price",
    },
  ];

  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader columns={columns}>
          {(column: column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items || []}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
