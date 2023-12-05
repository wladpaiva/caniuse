"use client";
import { CanIUse, Package, Runtime } from "@prisma/client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type UsingRow = Record<string, string | null>;

export default function UsingTable({
  packages,
  runtimes,
  canIUse,
}: {
  canIUse: CanIUse[];
  packages: Package[];
  runtimes: Runtime[];
}) {
  const list = [...runtimes, ...packages];

  const columns: ColumnDef<UsingRow>[] = [
    {
      header: () => null,
      cell: ({ row }) => (
        <div className="sticky left-0 text-right font-medium text-muted-foreground">
          {row.getValue("line")}
        </div>
      ),
      accessorKey: "line",
    },
  ];

  list.forEach((item) => {
    columns.push({
      header: () => <div className="text-center">{item.name}</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue(item.id)}</div>;
      },
      accessorKey: item.id,
    });
  });

  const data = list.map((item) => {
    const row: UsingRow = {
      line: item.name,
    };
    list.forEach((item2) => {
      row[item2.id] = item.id === item2.id ? null : "❔";
    });

    return row;
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative w-full rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
