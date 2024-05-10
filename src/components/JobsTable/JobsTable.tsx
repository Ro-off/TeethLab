import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
// import { useTableData } from "../../hooks/useTableData";
import { useAsyncList } from "@react-stately/data";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState } from "react";

export function JobsTable({
  numberOfStrings,
  offset,
  setOffset,
}: JobsTableProps) {
  console.log("JobsTable");
  console.log(
    `numberOfStrings: ${numberOfStrings}, offset: ${offset}, setOffset${setOffset}`
  );
  // const { data, isLoading: isLoading2 } = useTableData(offset, numberOfStrings);

  // const columns = [
  //   {
  //     key: "client",
  //     label: "CLIENT",
  //   },
  //   {
  //     key: "patient",
  //     label: "PATIENT",
  //   },
  //   {
  //     key: "technician",
  //     label: "TECHNICIAN",
  //   },
  // ];

  // function loadMoreTableData() {
  //   setOffset(offset + numberOfStrings);
  // }
  // return isLoading ? (
  //   <p>Loading...</p>
  // ) : (
  //   <Table
  //     color="primary"
  //     selectionMode="multiple"
  //     defaultSelectedKeys={["2", "3"]}
  //     aria-label="Example static collection table"
  //     // isHeaderSticky
  //     classNames={{ base: "max-h-full" }}
  //     bottomContent={<Button onPress={loadMoreTableData}>Load more</Button>}
  //   >
  //     <TableHeader columns={columns}>
  //       {(column: column) => (
  //         <TableColumn key={column.key}>{column.label}</TableColumn>
  //       )}
  //     </TableHeader>
  //     <TableBody items={data || []}>
  //       {(item) => (
  //         <TableRow key={item.id}>
  //           {(columnKey) => (
  //             <TableCell>{getKeyValue(item, columnKey)}</TableCell>
  //           )}
  //         </TableRow>
  //       )}
  //     </TableBody>
  //   </Table>
  // );

  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setIsLoading(false);
      }

      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(
        cursor || "https://swapi.py4e.com/api/people/?search=",
        { signal }
      );
      const json = await res.json();

      setHasMore(json.next !== null);

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with infinite pagination"
      baseRef={scrollerRef}
      bottomContent={
        hasMore ? (
          <div className="flex w-full justify-center">
            <Spinner ref={loaderRef} color="white" />
          </div>
        ) : null
      }
      classNames={{
        base: "max-h-[calc(100vh-4rem)] overflow-scroll",
        table: "min-h-[400px]",
      }}
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="height">Height</TableColumn>
        <TableColumn key="mass">Mass</TableColumn>
        <TableColumn key="birth_year">Birth year</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={
          list.items as {
            name: string;
            height: string;
            mass: string;
            hair_color: string;
            skin_color: string;
          }[]
        }
        loadingContent={<Spinner color="white" />}
      >
        {(item: {
          name: string;
          height: string;
          mass: string;
          hair_color: string;
          skin_color: string;
        }) => (
          <TableRow key={item.name}>
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

// type column = {
//   key: string;
//   label: string;
// };
