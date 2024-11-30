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
import { useTableDataGenerator } from "../../hooks/useJobsTableRowGenerator";

export function JobsTable() {
  const { getRecords } = useRecords();
  const { generateJobsTableRows } = useTableDataGenerator();
  const list = useAsyncList({
    async load() {
      const res = await getRecords(null, 10);
      const row = generateJobsTableRows(res.results);
      console.log(res);
      return {
        items: row,
      };
    },
  });

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
