import React, {
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

export interface TableData {
  eventId: string;
  connectionId: string;
  sequentialId: number;
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

interface TableProps {
  data: TableData[];
  channelName?: string;
  onUpdate?: (id: string, newDescription: string) => void;
  onDelete?: (eventId: string) => void;
}

export const Table: React.FC<TableProps> = ({ data, onDelete }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Define columns with sorting and editing
  const columns: ColumnDef<TableData>[] = useMemo(
    () => [
      {
        accessorKey: "sequentialId",
        header: "#",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "eventId",
        header: "Event ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "title",
        header: () => "Title",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => {
          const row = info.row.original;
          return <span>{row.description}</span>;
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (info) => info.getValue(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const row = info.row.original;
          return (
            <button
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-blue-600"
              onClick={() => onDelete && onDelete(row.eventId)}
            >
              Delete
            </button>
          );
        },
      },
    ],
    [onDelete]
  );

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Virtualization for rows
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: useCallback(() => 15, []),
    overscan: 25, // Keep a buffer of extra rows rendered
  });

  return (
    <div
      ref={tableContainerRef}
      className="h-[800px] overflow-y-auto border border-gray-300 rounded-lg no-overflow-anchoring scrollable-container"
    >
      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2 cursor-pointer">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <tr key={row.id} className="even:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
