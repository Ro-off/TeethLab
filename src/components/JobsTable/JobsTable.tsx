import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@nextui-org/react";

import { useTableData } from "../../hooks/useTableData";

export function JobsTable({
  numberOfStrings,
  offset,
  setOffset,
}: JobsTableProps) {
  // const [stringsLoaded, setStringsLoaded] = useState(numberOfStrings);
  const tableData = useTableData(offset, numberOfStrings);

  console.log(tableData);

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
  ];

  function loadMoreTableData() {
    // tableData = [...tableData, ...useTableData(offset, numberOfStrings)];
    setOffset(offset + numberOfStrings);
  }
  return (
    <Table
      color="primary"
      selectionMode="multiple"
      defaultSelectedKeys={["2", "3"]}
      aria-label="Example static collection table"
      // isHeaderSticky
      classNames={{ base: "max-h-full" }}
      bottomContent={<Button onPress={loadMoreTableData}>Load more</Button>}
    >
      <TableHeader columns={columns}>
        {(column: column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody items={tableData}>
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

type JobsTableProps = {
  numberOfStrings: number;
  offset: number;
  setOffset: (offset: number) => void;
};

type column = {
  key: string;
  label: string;
};
