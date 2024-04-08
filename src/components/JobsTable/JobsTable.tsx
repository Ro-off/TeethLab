import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from  "@nextui-org/react";

export function JobsTable(){
    return (
        <Table 
        color="primary"
        selectionMode="multiple" 
        defaultSelectedKeys={["2", "3"]} 
        aria-label="Example static collection table"
        // isHeaderSticky
        classNames={{base: "max-h-full" ,}}
      >
       
        <TableHeader>
          <TableColumn>Замовник</TableColumn>
          <TableColumn>Пацієнт</TableColumn>
          <TableColumn>Технік</TableColumn>
        </TableHeader>
        <TableBody >
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>Paused</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>Vacation</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="6">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="7">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="8">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="9">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="10">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="11">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="12">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="13">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="14">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="15">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="16">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="17">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="18">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="19">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="20">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="21">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="22">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="23">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="24">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="25">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="26">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="27">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="28">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="29">

            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="30">
            <TableCell>John Doe</TableCell>
            <TableCell>Software Engineer</TableCell>
            <TableCell>Active</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    )
}