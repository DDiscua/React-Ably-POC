import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, ColumnDef, flexRender } from "@tanstack/react-table";
import { useVirtual } from "@tanstack/react-virtual";
import { useChannel } from "ably/react";

interface TableData {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

interface VirtualizedTableProps {
  initialData: TableData[];
  channelName: string;
  onUpdate: (id: string, newDescription: string) => void;
}

const VirtualizedTableWithAbly: React.FC<VirtualizedTableProps> = ({
  initialData,
  channelName,
  onUpdate,
}) => {
  const [data, setData] = useState<TableData[]>(initialData);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [newDescription, setNewDescription] = useState<string>("");
  const [sortBy, setSortBy] = useState<{ id: keyof TableData; desc: boolean }>({
    id: "createdAt",
    desc: false,
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Listen for Ably events
  const [channel] = useChannel(channelName, (message) => {
    const event = message.data as TableData;
    console.log("Received event from Ably:", event);
    setData((prevData) => [...prevData, event]);
  });

  // Define columns with sorting and editing
  const columns: ColumnDef<TableData>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "title",
        header: () => <span onClick={() => toggleSort("title")}>Title</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => {
          const row = info.row.original;
          return editingRowId === row.id ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <button
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => {
                  onUpdate(row.id, newDescription);
                  setEditingRowId(null);
                }}
              >
                Save
              </button>
              <button
                className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={() => setEditingRowId(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <span>{row.description}</span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: () => (
          <span onClick={() => toggleSort("createdAt")}>Created At</span>
        ),
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
      {
        accessorKey: "category",
        header: () => (
          <span onClick={() => toggleSort("category")}>Category</span>
        ),
        cell: (info) => info.getValue(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const row = info.row.original;
          return (
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                setEditingRowId(row.id);
                setNewDescription(row.description);
              }}
            >
              Update
            </button>
          );
        },
      },
    ],
    [editingRowId, newDescription, toggleSort]
  );

  // Create table instance
  const table = useTable({
    data,
    columns,
    getCoreRowModel: () => {},
  });

  // Virtualization for rows
  const rowVirtualizer = useVirtual({
    size: table.getRowModel().rows.length,
    parentRef: tableContainerRef,
    estimateSize: () => 50, // Estimated row height
  });

  // Sort the data dynamically
  const toggleSort = (id: keyof TableData) => {
    setSortBy((prevSort) => ({
      id,
      desc: prevSort.id === id ? !prevSort.desc : false,
    }));
  };

  useEffect(() => {
    setData((prevData) =>
      [...prevData].sort((a, b) => {
        const fieldA = a[sortBy.id];
        const fieldB = b[sortBy.id];

        if (fieldA < fieldB) return sortBy.desc ? 1 : -1;
        if (fieldA > fieldB) return sortBy.desc ? -1 : 1;
        return 0;
      })
    );
  }, [sortBy]);

  return (
    <div
      ref={tableContainerRef}
      className="h-[500px] overflow-y-auto border border-gray-300 rounded-lg"
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
          {rowVirtualizer.virtualItems.map((virtualRow) => {
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

export default VirtualizedTableWithAbly;
