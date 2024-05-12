import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

import { useRecords } from "../../hooks/useRecords";

export function JobsTable() {
  const { getRecords } = useRecords();
  const list = useAsyncList({
    async load() {
      const res = await getRecords(null, 10);
      console.log(res);
      return {
        items: res.results,
      };
    },
  });

  const columns = [
    {
      key: "client",
      label: "CLIENT",
    },
    {
      key: "patient",
      label: "PATIENT",
    },
    {
      key: "technician",
      label: "TECHNICIAN",
    },
    {
      key: "date",
      label: "DATE",
    },
  ];

  return (
    <Table
      color="primary"
      selectionMode="multiple"
      // defaultSelectedKeys={["2", "3"]}
      aria-label="Example static collection table"
      // isHeaderSticky
      classNames={{ base: "max-h-full" }}
      // bottomContent={<Button onPress={loadMoreTableData}>Load more</Button>}
    >
      <TableHeader columns={columns}>
        {(column: column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody items={list.items || []}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

type column = {
  key: string;
  label: string;
};
