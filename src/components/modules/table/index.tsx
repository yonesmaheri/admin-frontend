"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React from "react";

function CustomTable({
  renderCell,
  rows,
  columns,
  isLoading,
}: {
  renderCell: any;
  rows: any[];
  columns: any[];
  isLoading: boolean;
}) {
  return (
    <Table isStriped aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<>Loading</>}
        items={rows}
        emptyContent={"No rows to display."}
      >
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default CustomTable;
