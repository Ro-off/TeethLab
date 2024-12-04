import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRecords } from "../../hooks/useRecords";
import { useTableDataGenerator } from "../../hooks/useJobsTableRowGenerator";
import { useSearchRequest } from "../../hooks/useSearchRequest";
import { PriceCalculator } from "../PriceCalculator/PriceCalculator";

export function JobsTable() {
  const { getRecords } = useRecords();
  const { generateJobsTableRows } = useTableDataGenerator();
  const { searchRequest } = useSearchRequest();

  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [prevSearchRequest, setPrevSearchRequest] = useState(searchRequest);

  useEffect(() => {
    if (searchRequest !== prevSearchRequest) {
      async function loadData() {
        const res = await getRecords(null, 10);
        const row = generateJobsTableRows(res.results);
        setItems(row);
      }
      loadData();
      setPrevSearchRequest(searchRequest);
    }
  }, [searchRequest, prevSearchRequest, getRecords, generateJobsTableRows]);

  function handleSelectionChange(keys: Set<Selection>) {
    setSelectedKeys(keys);
    setSelectedItems(
      Array.from(keys).map((key) => items.find((item) => item.id === key))
    );
  }

  const columns = [
    {
      key: "clientPatient",
      label: "CLIENT/PATiENT",
    },
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
      <Table
        color="primary"
        selectionMode="multiple"
        aria-label="Example static collection table"
        classNames={{ base: "max-h-full" }}
        selectedKeys={Array.from(selectedKeys)}
        onSelectionChange={handleSelectionChange}
      >
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
      <PriceCalculator items={selectedItems} />
    </>
  );
}

type column = {
  key: string;
  label: string;
};
