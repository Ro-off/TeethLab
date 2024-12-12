import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Selection,
} from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { useRecords } from "../../hooks/useRecords";
import { useTableDataGenerator } from "../../hooks/useJobsTableRowGenerator";
import { useSearchRequest } from "../../hooks/useSearchRequest";
import { PriceCalculator } from "../PriceCalculator/PriceCalculator";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export function JobsTable() {
  const { getRecords } = useRecords();
  const { generateJobsTableRows } = useTableDataGenerator();
  const { searchRequest } = useSearchRequest();

  interface TableItem {
    id: string;
    clientPatient: string | JSX.Element;
    technician: string;
    date: string;
    price: string | number | JSX.Element;
    priceUah: number | null;
    priceUsd: number | null;
  }

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const [selectedItems, setSelectedItems] = useState<TableItem[]>([]);
  const [items, setItems] = useState<TableItem[]>([]);
  const [lastItem, setLastItem] = useState<{ id: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const tableRef = useRef(null);

  const loadMoreData = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const lastItemId = lastItem?.id ?? null;
      const res = await getRecords(lastItemId, 150);

      if (res.results.length === 0) {
        return; // No more data to load
      }

      const rows = generateJobsTableRows(res.results);
      const newItems = rows.map((item) => ({
        id: item.id || "",
        clientPatient: item.clientPatient || "",
        technician: item.technician || "",
        date: item.date || "",
        price: item.price,
        priceUah: item.priceUah,
        priceUsd: item.priceUsd,
      }));

      setItems((prev) => {
        // Filter out any duplicates based on id
        const existingIds = new Set(prev.map((item) => item.id));
        const uniqueNewItems = newItems.filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prev, ...uniqueNewItems];
      });

      const lastResult = res.results[res.results.length - 1];
      if (lastResult?.id) {
        setLastItem({ id: lastResult.id });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useInfiniteScroll(tableRef.current, loadMoreData);

  useEffect(() => {
    const resetAndLoad = async () => {
      setIsLoading(true);
      setItems([]);
      setLastItem(null);
      setSelectedKeys(new Set([]));
      setSelectedItems([]);

      try {
        await loadMoreData();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    resetAndLoad();
  }, [searchRequest]);
  function handleSelectionChange(keys: Selection) {
    const selectedKeys = new Set(Array.from(keys).map((key) => String(key)));
    setSelectedKeys(selectedKeys);
    setSelectedItems(
      Array.from(selectedKeys)
        .map((key) => items.find((item) => item.id === key))
        .filter((item): item is TableItem => item !== undefined)
    );
  }

  const columns = [
    { key: "clientPatient", label: "CLIENT/PATIENT" },
    { key: "technician", label: "TECHNICIAN" },
    { key: "date", label: "DATE" },
    { key: "price", label: "PRICE" },
  ];

  return (
    <>
      <div ref={tableRef} className="h-[700px] overflow-auto">
        <Table
          color="primary"
          selectionMode="multiple"
          aria-label="Example static collection table"
          selectedKeys={Array.from(selectedKeys)}
          onSelectionChange={handleSelectionChange}
          bottomContent={
            isLoading && (
              <div className="flex justify-center w-full my-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )
          }
        >
          <TableHeader columns={columns}>
            {(column: column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PriceCalculator items={selectedItems} />
    </>
  );
}

type column = {
  key: string;
  label: string;
};
