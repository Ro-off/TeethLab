import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
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

  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastItem, setLastItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const tableRef = useRef(null);

  const loadMoreData = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const lastItemId = lastItem?.id;
      const res = await getRecords(lastItemId, 15);

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

      setLastItem(res.results[res.results.length - 1]);
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

  function handleSelectionChange(keys: Set<string>) {
    setSelectedKeys(keys);
    setSelectedItems(
      Array.from(keys).map((key) => items.find((item) => item.id === key))
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
